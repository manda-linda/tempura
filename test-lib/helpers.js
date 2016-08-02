// jasmine matcher for expecting an element to have a css class
// https://github.com/angular/angular.js/blob/master/test/matchers.js
var customMatchers  = {
  toHaveClass: function(util, customEqualityTesters) {
    return {
      compare: function(actual, expected) {
          var result = {};
          result.pass = actual.hasClass(expected);
          result.message = "Expected '" + actual + "'" + (result.pass ? ' not ' : ' ') + "to have class '" + expected + "'.";
          return result;
      }
    }
  },
  toBeHidden: function(util, customEqualityTesters) {
    return {
      compare: function(actual, expected) {
        var element = angular.element(actual);
        var result = {};
        result.pass = element.hasClass('ng-hide') ||
        element.css('display') == 'none';
        return result;
      }
    }
  },
  toBeClosed: function(util, customEqualityTesters) {
    return {
      compare: function(actual, expected) {
          var typeAheadEl = actual.find('ul');
          var result = {};
          result.pass = typeAheadEl.hasClass('ng-hide'); 
          result.message = 'Expected "' + angular.mock.dump(typeAheadEl)  + '" to be closed.';
          return result;
      }
    }
  },
  toBeOpenWithActive: function(util, customEqualityTesters) {
    return {
      compare: function(actual, expected) {
        var typeAheadEl = actual.find('ul');
        var liEls = actual.find('ul').find('li');
        var result = {};
        result.pass = typeAheadEl.length === 1 && liEls.length === expected;
        result.message = 'Expected "' + angular.mock.dump(typeAheadEl)  + '" to be opened.';
        return result;
      }
    }
  }
}

beforeEach(function() {
  jasmine.addMatchers(customMatchers);
});
