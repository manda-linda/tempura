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
        debounce: '&',
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
        scope.isOpen = function() {
          var isDropdownOpen = scope.matches.length > 0;
          scope.assignIsOpen({ isOpen: isDropdownOpen });
          return isDropdownOpen;
        };

        scope.isActive = function(matchIdx) {
          return scope.active === matchIdx;
        };

        scope.selectActive = function(matchIdx) {
          scope.active = matchIdx;
        };

        scope.forceReload = function(value){
          var debounce = scope.debounce();
          if (angular.isNumber(debounce) || angular.isObject(debounce)) {
            this.$$debounce(function() {
              scope.reload({value: value});
            }, angular.isNumber(debounce) ? debounce : debounce['default']);
          } else {
            scope.reload({value: value});
          }          
        }

        scope.selectMatch = function(activeIdx, evt) {
          var debounce = scope.debounce();
          if (angular.isNumber(debounce) || angular.isObject(debounce)) {
            this.$$debounce(function() {
              scope.select({activeIdx: activeIdx, evt: evt});
            }, angular.isNumber(debounce) ? debounce : debounce['default']);
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
