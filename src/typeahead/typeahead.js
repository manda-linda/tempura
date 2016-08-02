angular.module('tempura.typeahead', [])

/**
 * A helper service that can parse typeahead's syntax (string provided by users)
 * Extracted to a separate service for ease of unit testing
 */
  .factory('ghsTypeaheadParser', ['$parse', function ($parse) {

    //                      00000111000000000000022200000000000000003333333333333330000000000044000
    var TYPEAHEAD_REGEXP = /^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w\d]*))\s+in\s+([\s\S]+?)$/;

    return {
      parse: function (input) {

        var match = input.match(TYPEAHEAD_REGEXP);
        if (!match) {
          throw new Error(
            'Expected typeahead specification in form of "_modelValue_ (as _label_)? for _item_ in _collection_"' +
            ' but got "' + input + '".');
        }

        return {
          itemName: match[3],
          source: $parse(match[4]),
          viewMapper: $parse(match[2] || match[1]),
          modelMapper: $parse(match[1])
        };
      }
    };
  }])
/**
 * This factory is a substitute for uib.position
 * https://github.com/angular-ui/bootstrap/blob/master/src/position/position.js 
 */
  .factory('ghsPosition', ['$document', '$window', function($document, $window){
      return {
        getRawNode: function(elem) {
          return elem.nodeName ? elem : elem[0] || elem;
        },
        offset: function(elem) {
          elem = this.getRawNode(elem);
          var elemBCR = elem.getBoundingClientRect();
          return {
            width: Math.round(angular.isNumber(elemBCR.width) ? elemBCR.width : elem.offsetWidth),
            height: Math.round(angular.isNumber(elemBCR.height) ? elemBCR.height : elem.offsetHeight),
            top: Math.round(elemBCR.top + ($window.pageYOffset || $document[0].documentElement.scrollTop)),
            left: Math.round(elemBCR.left + ($window.pageXOffset || $document[0].documentElement.scrollLeft))
          };
        },
        position: function(elem) {
          elem = this.getRawNode(elem);

          var elemOffset = this.offset(elem);
          var parent = this.offsetParent(elem);
          var parentOffset = {top: 0, left: 0};

          if (parent !== $document[0].documentElement) {
            parentOffset = this.offset(parent);
            parentOffset.top += parent.clientTop - parent.scrollTop;
            parentOffset.left += parent.clientLeft - parent.scrollLeft;
          }

          return {
            width: Math.round(angular.isNumber(elemOffset.width) ? elemOffset.width : elem.offsetWidth),
            height: Math.round(angular.isNumber(elemOffset.height) ? elemOffset.height : elem.offsetHeight),
            top: Math.round(elemOffset.top - parentOffset.top),
            left: Math.round(elemOffset.left - parentOffset.left)
          };
        }
      }

  }])

  .directive('ghsTypeahead', ['$compile', '$parse', '$q', '$timeout', '$document', 'ghsPosition', 'ghsTypeaheadParser',
    function ($compile, $parse, $q, $timeout, $document, ghsPosition, ghsTypeaheadParser) {

      var HOT_KEYS = [9, 13, 27, 38, 40];

      return {
        require: 'ngModel',
        link: function (originalScope, element, attrs, modelCtrl) {

          //SUPPORTED ATTRIBUTES (OPTIONS)

          //minimal no of characters that needs to be entered before typeahead kicks-in
          var minSearch = originalScope.$eval(attrs.typeaheadMinLength) || 1;

          //minimal wait time after last character typed before typehead kicks-in
          var waitTime = originalScope.$eval(attrs.typeaheadWaitMs) || 0;

          //should it restrict model values to the ones selected from the popup only?
          var isEditable = originalScope.$eval(attrs.typeaheadEditable) !== false;

          //binding to a variable that indicates if matches are being retrieved asynchronously
          var isLoadingSetter = $parse(attrs.typeaheadLoading).assign || angular.noop;

          //override default popup template
          var parentTemplate = originalScope.$eval(attrs.typeaheadParentTemplate) || '';

          //a callback executed when a match is selected
          var onSelectCallback = $parse(attrs.typeaheadOnSelect);

          // a callback executed when the dropdown is closed
          var onCloseCallback = $parse(attrs.typeaheadOnClose) || angular.noop;

          var inputFormatter = attrs.typeaheadInputFormatter ? $parse(attrs.typeaheadInputFormatter) : undefined;

          var appendToBody = attrs.typeaheadAppendToBody ? originalScope.$eval(attrs.typeaheadAppendToBody) : false;

          //INTERNAL VARIABLES

          //model setter executed upon match selection
          var $setModelValue = $parse(attrs.ngModel).assign;

          //expressions used by typeahead
          var parserResult = ghsTypeaheadParser.parse(attrs.ghsTypeahead);

          //private var to disable popup showing
          var enablePopup = true;

          //private var to disable select right after matchSync is performed
          var enableSelect = true;

          //private var to disable 'touchend' signal from closing the autocomplete results
          var touchMove = false;

          //private var to keep track of whether or not we expose the getAsyncMatches function
          var exposeReload = attrs.exposeReload ? originalScope.$eval(attrs.exposeReload) : false;

          //create a child scope for the typeahead directive so we are not polluting original scope
          //with typeahead-specific data (matches, query etc.)
          var scope = originalScope.$new();
          originalScope.$on('$destroy', function () {
            scope.$destroy();
          });

          scope.popupState = {
            visible: false
          };
          scope.matches = [];

          // WAI-ARIA
          var popupId = 'typeahead-' + scope.$id + '-' + Math.floor(Math.random() * 10000);
          element.attr({
            'aria-autocomplete': 'list',
            'aria-expanded': false,
            'aria-owns': popupId
          });

          var showPopup = function () {
            if (minSearch <= modelCtrl.$viewValue.length && enablePopup && !scope.popupState.visible) {
              scope.popupState.visible = true;
              getMatchesAsync(modelCtrl.$viewValue);
            }
          };

          element.on('click', function () {
            showPopup();
          });

          element.on('focus', function () {
            showPopup();
          });

          //pop-up element used to display matches
          var popUpEl = angular.element('<div ghs-typeahead-popup></div>');
          popUpEl.attr({
            id: popupId,
            matches: 'matches',
            active: 'activeIdx',
            select: 'select(activeIdx)',
            query: 'query',
            position: 'position',
            'popup-state': 'popupState',
            parentTemplate: parentTemplate
          });

          //custom item template
          if (angular.isDefined(attrs.typeaheadTemplateUrl)) {
            popUpEl.attr('template-url', attrs.typeaheadTemplateUrl);
          }

          var hideMatches = function () {
            onCloseCallback(originalScope);
            scope.activeIdx = -1;
            scope.popupState.visible = false;
            element.attr('aria-expanded', false);
          };

          var getMatchId = function (index) {
            return popupId + '-option-' + index;
          };

          // Indicate that the specified match is the active (pre-selected) item in the list owned by this typeahead.
          // This attribute is added or removed automatically when the `activeIdx` changes.
          scope.$watch('activeIdx', function (index) {
            if (index < 0) {
              element.removeAttr('aria-activedescendant');
            } else {
              element.attr('aria-activedescendant', getMatchId(index));
            }
          });

          var getMatchesAsync = function (inputValue) {

            var locals = { $viewValue: inputValue };
            isLoadingSetter(originalScope, true);
            $q.when(parserResult.source(originalScope, locals)).then(function (matches) {

              //it might happen that several async queries were in progress if a user were typing fast
              //but we are interested only in responses that correspond to the current view value
              var onCurrentRequest = (inputValue === modelCtrl.$viewValue);

              if (onCurrentRequest && scope.popupState.visible) {

                enableSelectTimeout();

                if (matches.length > 0) {

                  scope.activeIdx = -1;
                  scope.matches.length = 0;

                  //transform labels
                  for (var i = 0; i < matches.length; i++) {
                    locals[parserResult.itemName] = matches[i];
                    scope.matches.push({
                      id: getMatchId(i),
                      label: parserResult.viewMapper(scope, locals),
                      model: matches[i]
                    });
                  }

                  scope.query = inputValue;
                  //position pop-up with matches - we need to re-calculate its position each time we are opening a window
                  //with matches as a pop-up might be absolute-positioned and position of an input might have changed on a page
                  //due to other elements being rendered
                  scope.position = appendToBody ? ghsPosition.offset(element) : ghsPosition.position(element);
                  scope.position.top = scope.position.top + element.prop('offsetHeight');

                  element.attr('aria-expanded', true);
                } else {
                  scope.matches.length = 0;
                  hideMatches();
                }
              }
              if (onCurrentRequest) {
                isLoadingSetter(originalScope, false);
              }
            }, function () {
              hideMatches();
              isLoadingSetter(originalScope, false);
            });
          };

          if (exposeReload) {
            originalScope.ngTypeaheadReload = getMatchesAsync;
          }

          hideMatches();

          //we need to propagate user's query so we can higlight matches
          scope.query = undefined;

          //Declare the timeout promise var outside the function scope so that stacked calls can be cancelled later
          var timeoutPromise;

          var scheduleSearchWithTimeout = function (inputValue) {
            timeoutPromise = $timeout(function () {
              getMatchesAsync(inputValue);
            }, waitTime);
          };

          var cancelPreviousTimeout = function () {
            if (timeoutPromise) {
              $timeout.cancel(timeoutPromise);
            }
          };

          var enablePopupPromise;
          var enablePopupTimeout = function () {
            cancelEnablePopupTimeout();

            enablePopup = false;
            enablePopupPromise = $timeout(function () {
              enablePopup = true;
              scope.$digest();
            }, 250);
          };
          var cancelEnablePopupTimeout = function () {
            if (enablePopupPromise) {
              $timeout.cancel(enablePopupPromise);
            }
          };

          var enableSelectPromise;
          var enableSelectTimeout = function () {
            cancelSelectTimeout();

            enableSelect = false;
            enableSelectPromise = $timeout(function () {
              enableSelect = true;
              scope.$digest();
            }, 250);
          };
          var cancelSelectTimeout = function () {
            if (enableSelectPromise) {
              $timeout.cancel(enableSelectPromise);
            }
          };

          //plug into $parsers pipeline to open a typeahead on view changes initiated from DOM
          //$parsers kick-in on all the changes coming from the view as well as manually triggered by $setViewValue
          modelCtrl.$parsers.unshift(function (inputValue) {
            if(inputValue.length >= minSearch) {
                scope.popupState.visible = true;
            } else {
                scope.popupState.visible = false;
            }
            
            if (waitTime > 0) {
              cancelPreviousTimeout();
              scheduleSearchWithTimeout(inputValue);
            } else {
              getMatchesAsync(inputValue);
            }

            if (isEditable) {
              return inputValue;
            } else {
              if (!inputValue) {
                // Reset in case user had typed something previously.
                modelCtrl.$setValidity('editable', true);
                return inputValue;
              } else {
                modelCtrl.$setValidity('editable', false);
                return undefined;
              }
            }
          });

          modelCtrl.$formatters.push(function (modelValue) {

            var candidateViewValue, emptyViewValue;
            var locals = {};

            if (inputFormatter) {

              locals['$model'] = modelValue;
              return inputFormatter(originalScope, locals);

            } else {

              //it might happen that we don't have enough info to properly render input value
              //we need to check for this situation and simply return model value if we can't apply custom formatting
              locals[parserResult.itemName] = modelValue;
              candidateViewValue = parserResult.viewMapper(originalScope, locals);
              locals[parserResult.itemName] = undefined;
              emptyViewValue = parserResult.viewMapper(originalScope, locals);

              return candidateViewValue !== emptyViewValue ? candidateViewValue : modelValue;
            }
          });

          scope.select = function (activeIdx) {
            //called from within the $digest() cycle
            var locals = {};
            var model, item;

            if (enableSelect && activeIdx >= 0 && scope.matches.length) {
              locals[parserResult.itemName] = item = scope.matches[activeIdx].model;

              // We do not want to set anything if the item is disabled.
              if (!item.ngDisabled) {
                model = parserResult.modelMapper(originalScope, locals);
                $setModelValue(originalScope, model);
                modelCtrl.$setValidity('editable', true);

                onSelectCallback(originalScope, {
                  $item: item,
                  $model: model,
                  $label: parserResult.viewMapper(originalScope, locals)
                });

                // Temporarily disable popup from displaying upon input focus
                enablePopupTimeout();
                hideMatches();

                //return focus to the input element if a match was selected via a mouse click event
                // use timeout to avoid $rootScope:inprog error
                $timeout(function () { element[0].focus(); }, 0, false);
              }
            }
          };

          //bind keyboard events: arrows up(38) / down(40), enter(13) and tab(9), esc(27)
          element.bind('keydown', function (evt) {

            //typeahead is open and an "interesting" key was pressed
            if (!scope.popupState.visible || HOT_KEYS.indexOf(evt.which) === -1) {
              return;
            }

            if (evt.which === 40) {
              evt.preventDefault();
              scope.activeIdx = (scope.activeIdx + 1) % scope.matches.length;
              scope.$digest();

            } else if (evt.which === 38) {
              evt.preventDefault();
              if (scope.activeIdx === -1) {
                scope.activeIdx = 0;
              }
              scope.activeIdx = (scope.activeIdx ? scope.activeIdx : scope.matches.length) - 1;
              scope.$digest();

            } else if (evt.which === 13 || evt.which === 9) {
              if (scope.activeIdx !== -1) {
                evt.preventDefault();
                scope.$apply(function () {
                  scope.select(scope.activeIdx);
                });
              } else {
                hideMatches();
                scope.$digest();
              }
            } else if (evt.which === 27) {
              evt.preventDefault();
              evt.stopPropagation();

              hideMatches();
              scope.$digest();
            }
          });

          function elementOrDropdownMatch(evt) {
            var level = 0;
            for (var el = evt.target; el && level <= 4; el = el.parentNode) {
              if (el === element[0] || el === element[0].nextSibling) {
                return true;
              }
              level++;
            }
            return false;
          }

          // Keep reference to click handler to unbind it.
          var dismissClickHandler = function (evt) {
            if (enableSelect && !touchMove && !elementOrDropdownMatch(evt)) {
              hideMatches();
              scope.$digest();
            }
          };
          var touchStartHandler = function(evt) {
            touchMove = false;
          };
          var touchMoveHandler = function(evt) {
            touchMove = true;
          };

          $document.bind('touchstart', touchStartHandler);
          $document.bind('touchmove', touchMoveHandler);
          $document.bind('click touchend', dismissClickHandler);

          originalScope.$on('$destroy', function () {
            $document.unbind('touchstart', touchStartHandler);
            $document.unbind('touchmove', touchMoveHandler);
            $document.unbind('click touchend', dismissClickHandler);
          });

          var $popup = $compile(popUpEl)(scope);
          if (appendToBody) {
            $document.find('body').append($popup);
          } else {
            element.after($popup);
          }
        }
      };

    }])

  .directive('ghsTypeaheadPopup', function () {
    return {
      restrict: 'EA',
      scope: {
        matches: '=',
        query: '=',
        active: '=',
        position: '=',
        select: '&',
        popupState: '='
      },
      replace: true,
      templateUrl: function (element, attrs) {
        var fileToLoad = attrs.parenttemplate && attrs.parenttemplate !== '' ? attrs.parenttemplate : 'typeahead-popup';
        return 'typeahead/template/' + fileToLoad + '.html';
      },
      link: function (scope, element, attrs) {

        scope.templateUrl = attrs.templateUrl;

        scope.isOpen = function () {
          return scope.popupState.visible && scope.matches.length > 0;
        };

        scope.isActive = function (matchIdx) {
          return scope.active == matchIdx;
        };

        scope.selectActive = function (matchIdx) {
          scope.active = matchIdx;
        };

        scope.selectMatch = function (activeIdx) {
          scope.select({ activeIdx: activeIdx });
        };
      }
    };
  })

  .directive('ghsTypeaheadMatch', ['$http', '$templateCache', '$compile', '$parse', function ($http, $templateCache, $compile, $parse) {
    return {
      restrict: 'EA',
      scope: {
        index: '=',
        match: '=',
        query: '='
      },
      link: function (scope, element, attrs) {
        var tplUrl = $parse(attrs.templateUrl)(scope.$parent) || 'typeahead/template/typeahead-match.html';
        $http.get(tplUrl, { cache: $templateCache }).success(function (tplContent) {
          element.replaceWith($compile(tplContent.trim())(scope));
        });
      }
    };
  }])

  .filter('ghsTypeaheadHighlight', ['$injector', '$sce', function ($injector, $sce) {
    var isSanitizePresent;
    isSanitizePresent = $injector.has('$sanitize');

    function escapeRegexp(queryToEscape) {
      // Regex: capture the whole query string and replace it with the string that will be used to match
      // the results, for example if the capture is "a" the result will be \a
      return queryToEscape.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
    }

    function containsHtml(matchItem) {
      return /<.*>/g.test(matchItem);
    }

    return function (matchItem, query) {
      if (!isSanitizePresent && containsHtml(matchItem)) {
        $log.warn('Unsafe use of typeahead please use ngSanitize'); // Warn the user about the danger
      }
      matchItem = query ? ('' + matchItem).replace(new RegExp(escapeRegexp(query), 'gi'), '<strong>$&</strong>') : matchItem; // Replaces the capture string with a the same string inside of a "strong" tag
      if (!isSanitizePresent) {
        matchItem = $sce.trustAsHtml(matchItem); // If $sanitize is not present we pack the string in a $sce object for the ng-bind-html directive
      }
      return matchItem;
    };
  }]);
