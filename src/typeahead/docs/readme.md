##GHS-Typeahead 

is a modified version of Angular Bootstraps' typeahead.
This directive can be used to quickly create elegant typeaheads with any form text input.

It is very well integrated into AngularJS as it uses a subset of the
[select directive](http://docs.angularjs.org/api/ng.directive:select) syntax, which is very flexible. Supported expressions are:

* _label_ for _value_ in _sourceArray_
* _select_ as _label_ for _value_ in _sourceArray_

The `sourceArray` expression can use a special `$viewValue` variable that corresponds to the value entered inside the input.

This directive works with promises, meaning you can retrieve matches using the `$http` service with minimal effort and utilizes 
one-way data-binding and functional debouncing to acheive better performance. It extends the original Angular Bootstraps directive by including
touch capabilities and reload features.

The ghs-typeahead directives provide several attributes:
* `ng-model`
   :
   Assignable angular expression to data-bind to

* `typeahead`
   :
   Comprehension Angular expression (see [select directive](http://docs.angularjs.org/api/ng.directive:select))

* `typeahead-append-to-body`
   _(Defaults: false)_ : Should the typeahead popup be appended to $body instead of the parent element?

* `typeahead-append-to`
    :
    Specify an element to append popup to

* `typeahead-editable`
   _(Defaults: true)_ :
   Should it restrict model values to the ones selected from the popup only ?

* `typeahead-input-formatter`
   _(Defaults: undefined)_ :
   Format the ng-model result after selection

*  `typeahead-is-open`
    :
    Variable to determine if popup is open

* `typeahead-loading`
   _(Defaults: angular.noop)_ :
   Binding to a variable that indicates if matches are being retrieved asynchronously

* `typeahead-min-length`
   _(Defaults: 1)_ :
   Minimal no of characters that needs to be entered before typeahead kicks-in

* `typeahead-on-select($item, $model, $label)`
   _(Defaults: null)_ :
   A callback executed when a match is selected

* `typeahead-should-select($event): boolean`
    _(Defaults: enter and tab)_ :
    A function to determine if an event should select

* `typeahead-select-on-blur`
    _(Defaults: false)_ :

* `typeahead-no-results`
    :
    A flag to determine if there were no results from query

* `typeahead-popup-template-url`
    :
    Set custom popup template

* `typeahead-template-url`
   :
   Set custom item template

* `typeahead-wait-ms`
   _(Defaults: 0)_ :
   Minimal wait time after last character typed before typeahead kicks-in

* `typeahead-on-close()`
   _(Defaults: null)_ :
   A callback executed when the dropdown is closed
