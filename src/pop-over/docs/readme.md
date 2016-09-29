##GHS Pop Over

is a lightweight, highly performant, scope-free Angular pop-over solution. It provides the ability to create popovers with transcluded html
or content into a generic template. Users can easily designate triggers and customize positioning while creating
minimal watchers.

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
The ghs-pop-over directives provide several attributes:
* `pop-over-make-active`

* `pop-over-disabled`

* `pop-over-triggers`

* `pop-over-vertical-offset`

* `pop-over-horizontal-offset`

* `pop-over-use-mouse-target`

* `pop-over-max-width`

* `pop-over-content`

* `pop-over-content-src`

* `pop-over-position`
:
left, right, top, bottom

* `pop-over-css-class`