# Tempura

[![Build Status] (https://travis-ci.org/manda-linda/tempura.svg?branch=master)](https://travis-ci.org/manda-linda/tempura)

##Setup module
`npm install manda-linda/tempura --save-dev`

```
angular.module('myModule', ['tempura']);
```
##ghs-pop-over

Sample usage:

```html
<div ghs-pop-over
     pop-over-max-width="200"
     pop-over-content="{{ ::somethingSpecial}}"
     position="bottom">
    Hover over me to see somethingSpecial in the popover.
</div>
```
```html
<div ghs-pop-over
     pop-over-max-width="200"
     pop-over-content-src=".ratings"
     position="bottom">
    <span> Hover over me to see yours popover </span>
    <div class="ratings">
        This markup will be moved to the popover
    </div>
</div>
```

###ghs-typeahead


Sample usage:

```html
<input ghs-typeahead="result.value for result in callBack($viewValue)" 
        ng-model="exampleModel.value" 
        ng-model-options="{ updateOn: 'default', debounce: { 'default': 500 } }" >
</input>
```
```html
<input ghs-typeahead="result.value for result in callBack2($viewValue)" 
        ng-model="exampleModel.value" 
        typeahead-template-url="typeaheadMatchReload.tpl.html" >
</input>
```


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


##Developing

###Install dependencies:
`npm install --global gulp-cli`

`npm install`

`jspm install`

`gulp installTypings` or `typings install`

###Testing
Run jasmine specs using karma server. All spec files must have "-spec" in the name

`gulp test` 

###Building
Jspm handles transpiling TS to ES5, bunding, and minifying. The output file is: dist/tempura.js

`gulp build`


##Serving
Run a gulp server to see demo at localhost:8080/index.html or unbuilt at localhost:8080/build-index.html

`gulp serve`
