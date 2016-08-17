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

