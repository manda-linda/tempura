  ///<reference path="../../typings/index.d.ts"/>
import template from './template/typeahead-match.html!text';

export class TypeaheadMatch implements ng.IDirective {
  constructor(private $templateRequest, private $compile, private $parse, private $templateCache) {
  }    
  public link = (scope, element, attrs) => {
        if (!this.$parse(attrs.templateUrl)(scope.$parent)){
          this.$templateCache.put('typeahead/template/typeahead-match.html', template);
        }
        var tplUrl = this.$parse(attrs.templateUrl)(scope.$parent) || 'typeahead/template/typeahead-match.html';
        this.$templateRequest(tplUrl).then((tplContent) => {
          var tplEl = angular.element(tplContent.trim());
          element.replaceWith(tplEl);
          this.$compile(tplEl)(scope);
        });
  };
  public restrict =  'A';
  public scope: any = {
        index: '<',
        match: '<',
        query: '<',
        reload: '&'
  };
  public static instance(): ng.IDirective {
      const directive = ($templateRequest, $compile, $parse, $templateCache) => new TypeaheadMatch($templateRequest, $compile, $parse, $templateCache);
      directive.$inject = ['$templateRequest', '$compile', '$parse', '$templateCache'];
      return directive;  
  };
}

export class TypeaheadMatchFilterFactory{
  public static Factory() {
    let filter = TypeaheadMatchFilter;
    filter.$inject = ['$injector', '$sce'];
    return filter;
  }
}

export class TypeaheadMatchFilter{
  private isSanitizePresent: boolean;
  constructor(private $injector, private $sce){
      this.isSanitizePresent = this.$injector.has('$sanitize');
      return this.$filter;
  }

  private $filter = (matchItem, query) => {
      if (!this.isSanitizePresent && TypeaheadMatchFilter.containsHtml(matchItem)) {
        $log.warn('Unsafe use of typeahead please use ngSanitize'); // Warn the user about the danger
      }
      matchItem = matchItem + ''; // make sure it's a string
      if (!this.isSanitizePresent) {
        matchItem = this.$sce.trustAsHtml(matchItem); // If $sanitize is not present we pack the string in a $sce object for the ng-bind-html directive
      }
      return matchItem;
  }

  public static containsHtml(matchItem) {
      return /<.*>/g.test(matchItem);
  }
}


var tempura = angular.module('tempura.typeahead.match', [])
  
  .directive('ghsTypeaheadMatch', TypeaheadMatch.instance())
  .filter('ghsTypeaheadSanitize', TypeaheadMatchFilterFactory.Factory());


