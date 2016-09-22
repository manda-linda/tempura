///<reference path="../../typings/index.d.ts"/>

// class imports for ts/intellisense
import {TempuraPosition, IBounds} from '../utility/position';
import {TypeaheadParser} from './typeahead-parser';

// full file import for system js
import '../utility/position';
import '../utility/debounce';
import './typeahead-parser';
import './typeahead-popup';
import './typeahead-match';

export class Typeahead implements ng.IDirective {
  public controller: any = TypeaheadController;
  public link:any = ($scope, $element, $attrs, ctrls) => {
      //trigger init for the ng-model and ng-model-options references
      ctrls[2].init(ctrls[0], ctrls[1]);
  };
  public restrict =  'A';
  public require =  ['ngModel', '^?ngModelOptions', 'ghsTypeahead'];
  public bindToController: any = {
    minLength: '<?typeaheadMinLength',
    waitTime: '<?typeaheadWaitMs',
    isEditable: '<?typeaheadEditable',
    shouldSelect:'&?typeaheadShouldSelect', // function to determin if an event should select
    onSelectCallback: '&?typeaheadOnSelect', 
    shouldSelectOnBlur: '<?typeaheadSelectOnBlur',  //Can this be combined with the 'shouldSelect function?
    noResults: '=?typeaheadNoResults', //variables that indicates if there were no results after query completed
    inputFormatter: '&?typeaheadInputFormatter',
    appendToBody: '<?typeaheadAppendToBody',
    appendTo: '<?typeaheadAppendTo',
    focusFirst: '<?typeaheadFocusFirst', // boolean
    focusOnSelect: '<?typeaheadFocusOnSelect',
    selectOnExact: '<?typeaheadSelectOnExact', // boolean
    isOpen: '=?typeaheadIsOpen', //boolean
    typeaheadTemplateUrl: '@?',
    typeaheadPopupTemplateUrl: '@?',
    isLoading: '=?typeaheadLoading'
  };
  public controllerAs: string = 'taVm';
  public static instance(): ng.IDirective {
    return new Typeahead();
  }
}

// Breaking in unit tests right now :(
class TypeaheadLink {
  constructor(private $scope, private $element, private $attrs, private ctrls) {
      //trigger init for the ng-model and ng-model-options references
      ctrls[2].init(ctrls[0], ctrls[1]);
  }
}

class TypeaheadController {
    public static $inject: Array<string> = [
      '$scope', 
      '$element', 
      '$attrs', 
      '$compile', 
      '$parse', 
      '$q', 
      '$timeout', 
      '$document', 
      '$window', 
      '$rootScope', 
      'tempuraPosition', 
      'typeaheadParser',
      '$$debounce'];

    private static HOT_KEYS: number[] = [9, 13, 27, 38, 40];
    private eventDebounceTime: number = 200;
    private modelCtrl: ng.INgModelController;
    private ngModelOptions: ng.INgModelOptions;

// Bindings
    private minLength: number;
    private waitTime: number;
    private isEditable: boolean;
    private shouldSelect: (vals: any) => boolean;
    private onSelectCallback: (vals: any) => any;
    private shouldSelectOnBlur: boolean;
    private noResults;
    private inputFormatter: (val:any) => string;
    private typeaheadTemplateUrl: string;
    private typeaheadPopupTemplateUrl: string;
    private appendToBody: boolean;
    private appendTo: string;
    private isOpen: boolean;
    private focusOnSelect: boolean;
    private isLoading: boolean;
    private focusFirst: boolean;
    private selectOnExact: boolean;
    private exposeReload:(fn:()=>void) => void;

// private instance vars
    private parsedModel;
    private parserResult;
    private invokeModelSetter;
    private hasFocus: boolean;
    private selected;
    private $popup;
    private popupId: string;
    private popUpEl: ng.IRootElementService;
    private timeoutPromise: any; // stacked timeout calls that might need to be cancelled
    private touchMove: boolean;
    private debounceSelect;
    private debounceIndex: number;
    private debounceEvt;

    public debounceUpdate;
    public matches: any[];
    public activeIdx: number;
    public query: string; // may not need this since we are removing highlight
    public moveInProgress: boolean;
    public position: IBounds;
    
    constructor(
            private $scope: ng.IScope, 
            private $element: ng.IRootElementService, 
            private $attrs: any, 
            private $compile: ng.ICompileService, 
            private $parse: ng.IParseService, 
            private $q: ng.IQService, 
            private $timeout: ng.ITimeoutService, 
            private $document: ng.IDocumentService, 
            private $window: ng.IWindowService, 
            private $rootScope: ng.IRootScopeService, 
            private tempuraPosition: TempuraPosition , 
            private typeaheadParser: TypeaheadParser,
            private $$debounce
      ) {
        this.defaultBindings();
        //model setter executed upon match selection
        this.parsedModel = this.$parse(this.$attrs.ngModel);
        this.parserResult = this.typeaheadParser.parse(this.$attrs.ghsTypeahead);
        this.invokeModelSetter = this.$parse(this.$attrs.ngModel + '($$$p)');
        this.touchMove = false;

        this.resetMatches();

        this.initAria();
        this.initPopupEl();
        this.initWatchers();

        this.initEventBindings();
        this.compilePopup();
      }


    public init( _modelCtrl, _ngModelOptions): void {
      this.modelCtrl = _modelCtrl;
      this.ngModelOptions = _ngModelOptions;

      this.debounceUpdate = this.modelCtrl.$options;

      this.debounceSelect = (angular.isNumber(this.debounceUpdate) || angular.isObject(this.debounceUpdate)) ?
                                  this.$$debounce(() => {
                                    this.select(this.debounceIndex, this.debounceEvt);
                                  }, angular.isNumber(this.debounceUpdate) ? this.debounceUpdate : this.debounceUpdate['default']) :
                                  angular.noop;
      //plug into $parsers pipeline to open a typeahead on view changes initiated from DOM
      //$parsers kick-in on all the changes coming from the view as well as manually triggered by $setViewValue
      this.modelCtrl.$parsers.unshift((inputValue) => {
        this.hasFocus = true;
        if (this.minLength === 0 || inputValue && inputValue.length >= this.minLength) {
          if (this.waitTime > 0) {
            this.cancelPreviousTimeout();
            this.scheduleSearchWithTimeout(inputValue);
          } else {
            this.getMatchesAsync(inputValue);
          }
        } else {
          this.isLoading = false;
          this.cancelPreviousTimeout();
          this.resetMatches();
        }

        if (this.isEditable) {
          return inputValue;
        }

        if (!inputValue) {
          // Reset in case user had typed something previously.
          this.modelCtrl.$setValidity('editable', true);
          return null;
        }

        this.modelCtrl.$setValidity('editable', false);
        return undefined;
      });

      this.modelCtrl.$formatters.push((modelValue) => {
        let candidateViewValue, 
            emptyViewValue,
            locals:any = {};

        // The validity may be set to false via $parsers (see above) if
        // the model is restricted to selected values. If the model
        // is set manually it is considered to be valid.
        if (!this.isEditable) {
          this.modelCtrl.$setValidity('editable', true);
        }

        if (this.inputFormatter) {
          locals.$model = modelValue;
          return this.inputFormatter(locals);
        }

        //it might happen that we don't have enough info to properly render input value
        //we need to check for this situation and simply return model value if we can't apply custom formatting
        locals[this.parserResult.itemName] = modelValue;
        candidateViewValue = this.parserResult.viewMapper(this.$scope, locals);
        locals[this.parserResult.itemName] = undefined;
        emptyViewValue = this.parserResult.viewMapper(this.$scope, locals);

        return candidateViewValue !== emptyViewValue ? candidateViewValue : modelValue;
      });
    }

    public assignIsOpen = (isOpen: boolean) => {
      this.isOpen = isOpen;
    }

    public select = (activeIdx: number, evt: ng.IAngularEvent) => {
      //called from within the $digest() cycle
      let locals = {},
          model, item;
      locals[this.parserResult.itemName] = item = this.matches[activeIdx].model;
      
      //do nothing if item is disabled
      if(item.ngDisabled){
        return;
      }

      this.selected = true;
      model = this.parserResult.modelMapper(this.$scope, locals);
      this.$setModelValue(this.$scope, model);
      this.modelCtrl.$setValidity('editable', true);
      this.modelCtrl.$setValidity('parse', true);

      this.onSelectCallback({
        $item: item,
        $model: model,
        $label: this.parserResult.viewMapper(this.$scope, locals),
        $event: evt
      });

      this.resetMatches();

      //return focus to the input element if a match was selected via a mouse click event
      // use timeout to avoid $rootScope:inprog error
      if (this.focusOnSelect!== false) {
        this.$timeout(() => { this.$element[0].focus(); }, 0, false);
      }
    };


    public getMatchesAsync = (inputValue, evt?: ng.IAngularEvent) => {
      var locals = {$viewValue: inputValue};
      this.isLoading = true;
      this.noResults = false;
      this.$q.when(this.parserResult.source(this.$scope, locals)).then((matches) => {
        //it might happen that several async queries were in progress if a user were typing fast
        //but we are interested only in responses that correspond to the current view value
        var onCurrentRequest = (inputValue === this.modelCtrl.$viewValue);
        if (onCurrentRequest) {
          if (matches && matches.length > 0) {
            this.activeIdx = this.focusFirst ? 0 : -1;
            this.noResults = false;
            this.matches.length = 0;

            //transform labels
            for (var i = 0; i < matches.length; i++) {
              locals[this.parserResult.itemName] = matches[i];
              this.matches.push({
                id: this.getMatchId(i),
                label: this.parserResult.viewMapper(this, locals),
                model: matches[i]
              });
            }

            this.query = inputValue;
            //position pop-up with matches - we need to re-calculate its position each time we are opening a window
            //with matches as a pop-up might be absolute-positioned and position of an input might have changed on a page
            //due to other elements being rendered
            this.recalculatePosition();

            this.$element.attr('aria-expanded', 'true');

            //Select the single remaining option if user input matches
            if (this.selectOnExact && this.matches.length === 1 && this.inputIsExactMatch(inputValue, 0)) {
              if (angular.isNumber(this.debounceUpdate) || angular.isObject(this.debounceUpdate)) {
                  this.debounceIndex = 0;
                  this.debounceEvt = evt;
                  this.debounceSelect();
              } else {
                this.select(0, evt);
              }
            }
          } else {
            this.resetMatches();
            this.noResults = true;
          }
        }
        if (onCurrentRequest) {
          this.isLoading = false;
        }
      }, () => {
        this.resetMatches();
        this.isLoading = false;
        this.noResults = true;
      });
    };

    private $setModelValue = (scope, newValue) => {
              if (angular.isFunction(this.parsedModel(this.$scope)) &&
                this.ngModelOptions && this.ngModelOptions.$options && this.ngModelOptions.$options.getterSetter) {
                return this.invokeModelSetter(scope, {$$$p: newValue});
              }

              return this.parsedModel.assign(scope, newValue);
        };
    
    private resetMatches = () => {
      this.matches = [];
      this.activeIdx = -1;
      this.$element.attr('aria-expanded', 'false');
    };

    private inputIsExactMatch = (inputValue, index) => {
      if (this.matches.length > index && inputValue) {
        return inputValue.toUpperCase() === this.matches[index].label.toUpperCase();
      }
      return false;
    };

    private getMinLength = (): number => {
      return !this.minLength && this.minLength !== 0 ? 1 : this.minLength;
    }

    private getMatchId = (index: number): string => {
      return this.popupId + '-option-' + index;
    }
    
    private fireRecalculating = () => {
      if (!this.moveInProgress) {
        this.moveInProgress = true;
        this.$scope.$digest();
      }

      this.debouncedRecalculate();
    }

    private scheduleSearchWithTimeout = (inputValue) => {
      this.timeoutPromise = this.$timeout(() => {
        this.getMatchesAsync(inputValue);
      }, this.waitTime);
    };

    private cancelPreviousTimeout = () => {
      if (this.timeoutPromise) {
        this.$timeout.cancel(this.timeoutPromise);
      }
    };

        // Declare the debounced function outside recalculating for
    // proper debouncing
    private debouncedRecalculate = this.$$debounce(() => {
      // if popup is visible
      if (this.matches.length) {
        this.recalculatePosition();
      }

      this.moveInProgress = false;
    }, this.eventDebounceTime);

    private recalculatePosition = () => {
      this.position = this.appendToBody ? this.tempuraPosition.offset(this.$element) : this.tempuraPosition.positionRelative(this.$element);
      this.position.top += this.$element.prop('offsetHeight');
    }

    private dismissClickHandler = (evt) => {
      // Issue #3973
      // Firefox treats right click as a click on document
      if (!this.touchMove && this.$element[0] !== evt.target && evt.which !== 3 && this.matches.length !== 0) {
        this.resetMatches();
        if (!this.$rootScope.$$phase) {
          this.$scope.$digest();
        }
      }
    };

    private touchStartHandler = (evt) => {
        this.touchMove = false;
    };
    private touchMoveHandler = (evt) => {
        this.touchMove = true;
    };

    /**
     * handle aria bindings
     * 
     */
    private initAria = () => {
      this.popupId = 'typeahead-' + this.$scope.$id + '-' + Math.floor(Math.random() * 10000);
      this.$element.attr({
        'aria-autocomplete': 'list',
        'aria-expanded': false,
        'aria-owns': this.popupId
      })
    }

    private initPopupEl = () => {
        this.popUpEl = angular.element('<div ghs-typeahead-popup></div>');
        this.popUpEl.attr({
          id: this.popupId,
          matches: 'taVm.matches',
          active: 'taVm.activeIdx',
          select: 'taVm.select(activeIdx, evt)',
          'move-in-progress': 'taVm.moveInProgress',
          query: 'taVm.query',
          position: 'taVm.position',
          'assign-is-open': 'taVm.assignIsOpen(isOpen)',
          debounce: 'taVm.debounceUpdate',
          reload: 'taVm.getMatchesAsync(value, evt)'
        });
        if (angular.isDefined(this.typeaheadTemplateUrl)) {
          this.popUpEl.attr('template-url', this.typeaheadTemplateUrl);
        }

        if (angular.isDefined(this.typeaheadPopupTemplateUrl)) {
          this.popUpEl.attr('popup-template-url', this.typeaheadPopupTemplateUrl);
        }
    }

    private initWatchers = () => {
        let $rootListeners:any = {
            activeIndex : this.$scope.$watch(() => { return this.activeIdx}, (index: number) => {
                if (!angular.isDefined(index) || index < 0) {
                  this.$element.removeAttr('aria-activedescendant');
                } else {
                  this.$element.attr('aria-activedescendant', this.getMatchId(index));
                }
              })
          };
        if(this.appendToBody) {
          angular.element(this.$window).on('resize', this.fireRecalculating);
          this.$document.find('body').on('scroll', this.fireRecalculating);
        }

          this.$scope.$on('$destroy', () => {
              angular.element(this.$window).off('resize', this.fireRecalculating);
              this.$document.find('body').off('scroll', this.fireRecalculating);
              this.$document.off('click touchend', this.dismissClickHandler);
              this.$document.off('touchstart', this.touchStartHandler);
              this.$document.off('touchmove', this.touchMoveHandler);

              if(this.appendToBody || this.appendTo) {
                this.$popup.remove();
              }

              this.popUpEl.remove()
              
          });

        for (let unbind in $rootListeners) {
            this.$scope.$on('$destroy', $rootListeners[unbind]);
        }
    }

    private initEventBindings = () => {

      //bind keyboard events: arrows up(38) / down(40), enter(13) and tab(9), esc(27)
      this.$element.on('keydown', (evt: any) => {
        //typeahead is open and an "interesting" key was pressed
        if (this.matches.length === 0 || TypeaheadController.HOT_KEYS.indexOf(evt.which) === -1) {
          return;
        }

        var shouldSelectBoolean = this.shouldSelect({$event: evt});

        /**
         * if there's nothing selected (i.e. focusFirst) and enter or tab is hit
         * or
         * shift + tab is pressed to bring focus to the previous element
         * then clear the results
         */

        if (this.activeIdx === -1 && shouldSelectBoolean || evt.which === 9 && !!evt.shiftKey) {
          this.resetMatches();
          this.$scope.$digest();
          return;
        }

        evt.preventDefault();
        var target;
        switch (evt.which) {
          case 27: // escape
            evt.stopPropagation();

            this.resetMatches();
            this.$scope.$digest();
            break;
          case 38: // up arrow
            this.activeIdx = (this.activeIdx > 0 ? this.activeIdx : this.matches.length) - 1;
            this.$scope.$digest();
            break;
          case 40: // down arrow
            this.activeIdx = (this.activeIdx + 1) % this.matches.length;
            this.$scope.$digest();
            break;
          default:
            if (shouldSelectBoolean) {
              this.$scope.$apply(() => {
                if (angular.isNumber(this.debounceUpdate) || angular.isObject(this.debounceUpdate)) {
                    this.debounceIndex = this.activeIdx;
                    this.debounceEvt = evt;
                    this.debounceSelect();
                } else {
                  this.select(this.activeIdx, evt);
                }
              });
            }
        }
      });

      this.$element.bind('focus',  (evt:any) => {
          this.hasFocus = true;
      
          // @TODO (adasilva) not sure what this is about
          if (this.minLength === 0 && !this.modelCtrl.$viewValue) {
            this.$timeout(() => {
              this.getMatchesAsync(this.modelCtrl.$viewValue, evt);
            }, 0);
          } else if (this.modelCtrl.$viewValue && this.minLength <= this.modelCtrl.$viewValue.length) {
            this.$timeout(() => {
              this.getMatchesAsync(this.modelCtrl.$viewValue, evt);
            }, 0);
          }
        });

      this.$element.bind('blur', (evt: any) => {
        if (this.shouldSelectOnBlur && this.matches.length && this.activeIdx !== -1 && !this.selected) {
          this.selected = true;
          this.$scope.$apply(() => {
            if (angular.isObject(this.debounceUpdate) && angular.isNumber(this.debounceUpdate.blur)) {
              this.$$debounce(function() {
                this.select(this.activeIdx, evt);
              }, this.debounceUpdate.blur)();
            } else {
              this.select(this.activeIdx, evt);
            }
          });
        }
        if (!this.isEditable && this.modelCtrl.$error.editable) {
          this.modelCtrl.$setViewValue();
          this.$scope.$apply(() => {
            // Reset validity as we are clearing
            this.modelCtrl.$setValidity('editable', true);
            this.modelCtrl.$setValidity('parse', true);
          });
          this.$element.val('');
        }
        this.hasFocus = false;
        this.selected = false;
      });


      this.$document.on('touchstart', this.touchStartHandler);
      this.$document.on('touchmove', this.touchMoveHandler);
      this.$document.on('click touchend', this.dismissClickHandler);
  }

  private compilePopup = () => {
    this.$popup = this.$compile(this.popUpEl)(this.$scope);
    if (this.appendToBody) {
      this.$document.find('body').append(this.$popup);
    } else if (this.appendTo) {
      angular.element(this.appendTo).eq(0).append(this.$popup);
    } else {
      this.$element.after(this.$popup);
    }
  }

  private defaultBindings = () => {
    if(!this.minLength && this.minLength !== 0) {
      this.minLength = 1;
    }
    this.waitTime = this.waitTime ? this.waitTime : 0;
    this.isEditable = this.isEditable !== false;
    this.shouldSelectOnBlur = angular.isDefined(this.shouldSelectOnBlur) ? this.shouldSelectOnBlur : false;

    this.shouldSelect = this.shouldSelect ? this.shouldSelect : (vals) => {
                    let evt = vals.$event;
                    return evt.which === 13 || evt.which === 9;
            }; 

    this.appendToBody = !!this.appendToBody;
    this.appendTo = this.appendTo || null;
    this.focusFirst = this.focusFirst !== false;
    this.selectOnExact = !!this.selectOnExact;
    this.onSelectCallback = this.onSelectCallback || angular.noop;
  }

}

let tempura = angular.module('tempura.typeahead', ['tempura.typeahead.popup', 'tempura.typeahead.match', 'tempura.typeahead-parser', 'tempura.utility.position', 'tempura.utility.debounce'])
.directive('ghsTypeahead', Typeahead.instance);