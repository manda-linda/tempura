///<reference path="../../typings/index.d.ts"/>
import template from './template/typeahead-popup.html!text';
import '../utility/debounce';

export class TypeaheadPopup implements ng.IDirective {
  constructor(private $$debounce, private $templateCache){

  }
  public scope: any = {
        matches: '<',
        query: '<',
        active: '=',
        position: '<',
        moveInProgress: '<',
        select: '&',
        assignIsOpen: '&',
        debounce: '<',
        templateUrl: '@',
        reload:'&'
  };
  public replace: boolean = true;
  public templateUrl = (element, attrs) => {
        if (!attrs.popupTemplateUrl) {
          this.$templateCache.put('typeahead/template/typeahead-popup.html', template);
        }
        return attrs.popupTemplateUrl || 'typeahead/template/typeahead-popup.html';
  };

  public link = (scope, element, attrs) => {
        let debounceReload,
            debounceValue,
            debounceSelect,
            debounceIndex,
            debounceEvt;
        scope.isOpen = () => {
          var isDropdownOpen = scope.matches.length > 0;
          scope.assignIsOpen({ isOpen: isDropdownOpen });
          return isDropdownOpen;
        };

        scope.isActive = (matchIdx) => {
          return scope.active === matchIdx;
        };

        scope.selectActive = (matchIdx) => {
          scope.active = matchIdx;
        };

        scope.forceReload = (value) => {
          var debounce = scope.debounce;
          debounceValue = value;
          if (debounceReload) {
            debounceReload();
          } else if (angular.isNumber(debounce) || angular.isObject(debounce)) {
              debounceReload = this.$$debounce(() => {
                scope.reload({value: debounceValue});
              }, angular.isNumber(debounce) ? debounce : debounce['default']);
              debounceReload();
          } else {
            scope.reload({value: value});
          }          
        }

        scope.selectMatch = (activeIdx, evt) => {
          var debounce = scope.debounce;
          debounceIndex = activeIdx;
          debounceEvt = evt;
          evt.preventDefault();
          evt.stopImmediatePropagation();
          if (debounceSelect) {
            debounceSelect();
          } else if (angular.isNumber(debounce) || angular.isObject(debounce)) {
            debounceSelect = this.$$debounce(() => {
              scope.select({activeIdx: debounceIndex, evt: debounceEvt});
            }, angular.isNumber(debounce) ? debounce : debounce['default']);
            debounceSelect();
          } else {
            scope.select({activeIdx: activeIdx, evt: evt});
          }
        };
      }
      public static instance(): ng.IDirective{
        const directive =  ($$debounce, $templateCache) => new TypeaheadPopup($$debounce, $templateCache);
        directive.$inject = ['$$debounce', '$templateCache'];
        return directive;  
      }

}

var tempura = angular.module('tempura.typeahead.popup', [])
.directive('ghsTypeaheadPopup', TypeaheadPopup.instance());
