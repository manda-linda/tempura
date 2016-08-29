!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return D(e.substr(6));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["1"], [], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
!function(e){function n(e,n){e=e.replace(l,"");var r=e.match(u),t=(r[1].split(",")[n]||"require").replace(s,""),i=p[t]||(p[t]=new RegExp(a+t+f,"g"));i.lastIndex=0;for(var o,c=[];o=i.exec(e);)c.push(o[2]||o[3]);return c}function r(e,n,t,o){if("object"==typeof e&&!(e instanceof Array))return r.apply(null,Array.prototype.splice.call(arguments,1,arguments.length-1));if("string"==typeof e&&"function"==typeof n&&(e=[e]),!(e instanceof Array)){if("string"==typeof e){var l=i.get(e);return l.__useDefault?l["default"]:l}throw new TypeError("Invalid require")}for(var a=[],f=0;f<e.length;f++)a.push(i["import"](e[f],o));Promise.all(a).then(function(e){n&&n.apply(null,e)},t)}function t(t,l,a){"string"!=typeof t&&(a=l,l=t,t=null),l instanceof Array||(a=l,l=["require","exports","module"].splice(0,a.length)),"function"!=typeof a&&(a=function(e){return function(){return e}}(a)),void 0===l[l.length-1]&&l.pop();var f,u,s;-1!=(f=o.call(l,"require"))&&(l.splice(f,1),t||(l=l.concat(n(a.toString(),f)))),-1!=(u=o.call(l,"exports"))&&l.splice(u,1),-1!=(s=o.call(l,"module"))&&l.splice(s,1);var p={name:t,deps:l,execute:function(n,t,o){for(var p=[],c=0;c<l.length;c++)p.push(n(l[c]));o.uri=o.id,o.config=function(){},-1!=s&&p.splice(s,0,o),-1!=u&&p.splice(u,0,t),-1!=f&&p.splice(f,0,function(e,t,l){return"string"==typeof e&&"function"!=typeof t?n(e):r.call(i,e,t,l,o.id)});var d=a.apply(-1==u?e:t,p);return"undefined"==typeof d&&o&&(d=o.exports),"undefined"!=typeof d?d:void 0}};if(t)c.anonDefine||c.isBundle?c.anonDefine&&c.anonDefine.name&&(c.anonDefine=null):c.anonDefine=p,c.isBundle=!0,i.registerDynamic(p.name,p.deps,!1,p.execute);else{if(c.anonDefine&&!c.anonDefine.name)throw new Error("Multiple anonymous defines in module "+t);c.anonDefine=p}}var i=$__System,o=Array.prototype.indexOf||function(e){for(var n=0,r=this.length;r>n;n++)if(this[n]===e)return n;return-1},l=/(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm,a="(?:^|[^$_a-zA-Z\\xA0-\\uFFFF.])",f="\\s*\\(\\s*(\"([^\"]+)\"|'([^']+)')\\s*\\)",u=/\(([^\)]*)\)/,s=/^\s+|\s+$/g,p={};t.amd={};var c={isBundle:!1,anonDefine:null};i.amdDefine=t,i.amdRequire=r}("undefined"!=typeof self?self:global);
///<reference path="../../typings/index.d.ts"/>
$__System.register('2', [], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var PopOver, PopOverController, tempura;
    return {
        setters: [],
        execute: function () {
            PopOver = function () {
                function PopOver() {
                    this.controller = PopOverController;
                    this.restrict = 'A';
                    this.bindToController = false;
                    this.scope = false;
                    this.link = function (scope, element, attrs, ctrl) {
                        // if on start its disabled, then don't do anything
                        if (attrs.popOverDisabled !== 'true') {
                            ctrl.initialize();
                        }
                        if (attrs.popOverEnableWatchers === 'true') {
                            ctrl.addWatchers();
                        }
                    };
                }
                PopOver.instance = function () {
                    return new PopOver();
                };
                return PopOver;
            }();
            exports_1("PopOver", PopOver);
            PopOverController = function () {
                function PopOverController($scope, $compile, $window, $document, $element, $attrs) {
                    var _this = this;
                    this.$scope = $scope;
                    this.$compile = $compile;
                    this.$window = $window;
                    this.$document = $document;
                    this.$element = $element;
                    this.$attrs = $attrs;
                    this.isInitialized = false;
                    /// DOM EVENT HANDLERS
                    this.showPopOver = function (event) {
                        _this.cancelHideTimer();
                        _this.cancelShowItmer();
                        setTimeout(function () {
                            if (/click/i.test(event.type)) {
                                if (!_this.isActive) {
                                    _this.showPopOverHandler(event);
                                } else {
                                    _this.hidePopOverHandler();
                                }
                            } else {
                                _this.showPopOverHandler(event);
                            }
                        }, 100);
                    };
                    this.showPopOverHandler = function (event) {
                        if (_this.isActive) {
                            return;
                        }
                        _this.setPopOverPosition(event);
                        angular.element(_this.popOverElement).addClass('active');
                        _this.moveCaret();
                        if (!(_this.$attrs.popOverNoScroll === 'true')) {
                            _this.scrollToPopOver();
                        }
                        _this.isActive = true;
                    };
                    this.hidePopOverHandler = function (event) {
                        angular.element(_this.popOverElement).removeClass('active');
                        _this.isActive = false;
                    };
                    this.hidePopOver = function (event) {
                        _this.cancelHideTimer();
                        var timeout = parseInt(_this.$attrs.popOverHideTimeout || 100, 10);
                        _this.hidePopOverTimer = setTimeout(function () {
                            _this.hidePopOverHandler(event);
                        }, timeout);
                    };
                    this.cancelHideTimer = function () {
                        clearTimeout(_this.hidePopOverTimer);
                        _this.hidePopOverTimer = undefined;
                    };
                    this.cancelShowItmer = function () {
                        clearTimeout(_this.showPopOverTimer);
                        _this.showPopOverTimer = undefined;
                    };
                    // remove events
                    this.$scope.$on('$destroy', function () {
                        if (!_this.isInitialized) {
                            return;
                        }
                        _this.removeEventListeners();
                        _this.removeFromDocument();
                    });
                }
                PopOverController.prototype.initialize = function () {
                    this.createAndAttachPopOver();
                    this.parseEventsToHandle();
                    this.addEventListeners();
                    this.isInitialized = true;
                };
                PopOverController.prototype.addWatchers = function () {
                    var _this = this;
                    this.$scope.$watch(function () {
                        return _this.$attrs.popOverDisabled;
                    }, function (isDisabled) {
                        if (isDisabled === 'true' && _this.isInitialized) {
                            _this.removeEventListeners();
                        } else {
                            if (!_this.isInitialized) {
                                _this.initialize();
                            } else {
                                _this.addEventListeners();
                            }
                        }
                    });
                    this.$scope.$watch(function () {
                        return _this.$attrs.popOverMakeActive;
                    }, function (isActive) {
                        if (isActive === 'true') {
                            if (!_this.isInitialized) {
                                _this.initialize();
                            }
                            _this.showPopOverHandler();
                        } else {
                            _this.hidePopOverHandler();
                        }
                    });
                };
                PopOverController.prototype.parseEventsToHandle = function () {
                    var triggers = this.$attrs.popOverTriggers,
                        tagName = this.$element[0].tagName;
                    // for click, we override all other values and only allow click events to trump
                    // other triggers and closers
                    if (/click/i.test(triggers)) {
                        this.isClick = true;
                        this.triggers = ['click', 'touchstart'];
                        return;
                    }
                    // otherwise continue with assignment of triggers and closers
                    if (triggers) {
                        this.triggers = triggers.replace(/(?!,)\W+/g, '').split(',');
                    } else {
                        this.triggers = /button|input/i.test(tagName) ? ['focus'] : ['mouseover', 'touchstart']; // default based upon tag type
                    }
                    this.closers = [];
                    // closers are automatically paired up with the trigger, EXCEPT click which is always closed by click
                    if (this.triggers.indexOf('focus') > -1) {
                        this.isFocus = true;
                        this.closers.push('blur');
                    }
                    if (this.triggers.indexOf('mouseover') > -1) {
                        this.isHover = true;
                        this.closers.push('mouseout');
                    }
                    if (this.triggers.indexOf('touchstart') > -1) {
                        this.isHover = true;
                        this.closers.push('touchleave');
                    }
                };
                PopOverController.prototype.addEventListeners = function () {
                    var _this = this;
                    var element = this.$element[0];
                    // since click is a toggle there is no separate closing event
                    if (this.isClick) {
                        element.addEventListener('click', this.showPopOver);
                        element.addEventListener('touchstart', this.showPopOver);
                        return;
                    }
                    // all others
                    this.triggers.forEach(function (trigger) {
                        element.addEventListener(trigger, _this.showPopOver);
                    });
                    this.closers.forEach(function (closer) {
                        // for the touchend event we add a longer delay
                        element.addEventListener(closer, _this.hidePopOver);
                    });
                    this.popOverElement.addEventListener('mouseover', this.cancelHideTimer);
                    this.popOverElement.addEventListener('mouseout', this.hidePopOver);
                };
                PopOverController.prototype.removeEventListeners = function () {
                    var _this = this;
                    var element = this.$element[0];
                    if (this.isClick) {
                        element.removeEventListener('click', this.showPopOver);
                        element.removeEventListener('touchstart', this.showPopOver);
                        return;
                    }
                    this.triggers.forEach(function (trigger) {
                        element.removeEventListener(trigger, _this.showPopOver);
                    });
                    this.closers.forEach(function (closer) {
                        element.removeEventListener(closer, _this.hidePopOver);
                    });
                    this.popOverElement.removeEventListener('mouseover', this.cancelHideTimer);
                    this.popOverElement.removeEventListener('mouseout', this.hidePopOver);
                };
                PopOverController.prototype.getReferencePoints = function (event) {
                    var elemBounds = this.$element[0].getBoundingClientRect(),
                        bodyBounds = this.$document[0].body.getBoundingClientRect(),
                        poBounds = this.popOverElement.getBoundingClientRect(),
                        useMouseTarget = this.$attrs.popOverUseMouseTarget === 'true',
                        _leftPos,
                        _topPos;
                    if (useMouseTarget) {
                        _leftPos = event.clientX - bodyBounds.left;
                        _topPos = event.clientY - bodyBounds.top;
                    } else {
                        // center of target element
                        _leftPos = elemBounds.left - bodyBounds.left + elemBounds.width / 2;
                        _topPos = elemBounds.top - bodyBounds.top + elemBounds.height / 2;
                    }
                    switch (this.position) {
                        case PopOverController.positions.top:
                            _leftPos -= poBounds.width / 2;
                            _topPos -= poBounds.height + elemBounds.height / 2;
                            break;
                        case PopOverController.positions.left:
                            _leftPos -= poBounds.width;
                            _topPos -= poBounds.height / 2;
                            break;
                        case PopOverController.positions.right:
                            _topPos -= poBounds.height / 2;
                            break;
                        default:
                            _leftPos -= poBounds.width / 2;
                            _topPos += elemBounds.height / 2;
                    }
                    return {
                        left: _leftPos,
                        top: _topPos
                    };
                };
                PopOverController.prototype.setPopOverPosition = function (event) {
                    this.position = this.$attrs.position || PopOverController.positions.bottom; // bottom is default
                    var poBounds = this.popOverElement.getBoundingClientRect(),
                        screenWidth = this.$document[0].documentElement.clientWidth,
                        verticalOffset = parseInt(this.$attrs.popOverVerticalOffset, 10) || 0,
                        horizontalOffset = parseInt(this.$attrs.popOverHorizontalOffset, 10) || 10;
                    var referencePoints = this.getReferencePoints(event);
                    // force left and right to use top if offscreen
                    if (this.position === PopOverController.positions.right && referencePoints.left + poBounds.width > screenWidth || this.position === PopOverController.positions.left && referencePoints.left - poBounds.width < 0) {
                        this.position = PopOverController.positions.bottom;
                        // redefine position points
                        referencePoints = this.getReferencePoints(event);
                    }
                    // set styles based upon position
                    var top = 'auto',
                        left = 'auto',
                        right = 'auto';
                    switch (this.position) {
                        case PopOverController.positions.top:
                        case PopOverController.positions.bottom:
                            var _left = referencePoints.left;
                            // if element would be off screen then set to 0
                            _left = _left < 0 ? 0 : _left;
                            top = (this.position === PopOverController.positions.top ? referencePoints.top - verticalOffset : referencePoints.top + verticalOffset) + 'px';
                            // check right overflow
                            if (_left + poBounds.width > screenWidth) {
                                left = 'auto';
                                right = '0';
                            } else {
                                left = _left + 'px';
                            }
                            break;
                        case PopOverController.positions.right:
                        case PopOverController.positions.left:
                            left = (this.position === PopOverController.positions.left ? referencePoints.left - horizontalOffset : referencePoints.left + horizontalOffset) + 'px';
                            var _top = referencePoints.top;
                            top = _top < 0 ? '0' : _top + 'px';
                            break;
                        default:
                            break;
                    }
                    var poStyle = this.popOverElement.style;
                    // set values
                    poStyle.left = left;
                    poStyle.right = right;
                    poStyle.top = top;
                    // first remove any lingering classes
                    for (var pos in PopOverController.positions) {
                        angular.element(this.popOverElement).removeClass(pos);
                    }
                    angular.element(this.popOverElement).addClass(this.position);
                };
                PopOverController.prototype.moveCaret = function () {
                    var caret = this.popOverElement.querySelectorAll('.caret')[0],
                        useMouseTarget = this.$attrs.popOverUseMouseTarget === 'true',
                        caretBounds = caret.getBoundingClientRect();
                    if (!caret) {
                        return;
                    }
                    var poBounds = this.popOverElement.getBoundingClientRect(),
                        elemBounds = this.$element[0].getBoundingClientRect();
                    if (this.position === PopOverController.positions.top || this.position === PopOverController.positions.bottom) {
                        var _left = -1 * (caretBounds.width / 2),
                            poHorizontalCenter = poBounds.left + poBounds.width / 2,
                            elemHorizontalCenter = elemBounds.left + elemBounds.width / 2;
                        if (poHorizontalCenter === elemHorizontalCenter || useMouseTarget) {
                            _left += poBounds.width / 2;
                        } else {
                            _left += elemBounds.left - poBounds.left + elemBounds.width / 2;
                        }
                        caret.style.left = _left + 'px';
                        if (this.position === PopOverController.positions.top) {
                            caret.style.bottom = -1 * caretBounds.height + 'px';
                        } else {
                            caret.style.top = -1 * caretBounds.height + 'px';
                        }
                    } else {
                        // right || left
                        var _top = -1 * (caretBounds.height / 2),
                            poVerticalCenter = poBounds.top + poBounds.height / 2,
                            elemVerticalCenter = elemBounds.top + elemBounds.height / 2;
                        if (poVerticalCenter === elemVerticalCenter || useMouseTarget) {
                            // just subtract the caret height
                            _top += poBounds.height / 2;
                        } else {
                            _top += elemBounds.top - poBounds.top + elemBounds.height / 2;
                        }
                        caret.style.top = _top + 'px';
                        if (this.position === PopOverController.positions.right) {
                            caret.style.left = -1 * caretBounds.width + 'px';
                        } else {
                            caret.style.right = -1 * caretBounds.width + 'px';
                        }
                    }
                };
                PopOverController.prototype.scrollToPopOver = function () {
                    var poBounds = this.popOverElement.getBoundingClientRect(),
                        screenHeight = this.$document[0].documentElement.clientHeight,
                        scrollPosition = -1 * this.$document[0].documentElement.getBoundingClientRect().top,
                        scrollOffset = 50,
                        scrollTo = 0;
                    // popover is off the screen
                    if (poBounds.top < scrollOffset) {
                        scrollTo = scrollPosition + poBounds.top - scrollOffset;
                    } else if (poBounds.bottom > screenHeight) {
                        scrollTo = scrollPosition - (screenHeight - poBounds.bottom);
                    }
                    if (scrollTo !== 0) {
                        this.$window.scrollTo(0, scrollTo);
                    }
                };
                PopOverController.prototype.createAndAttachPopOver = function () {
                    var content = this.$attrs.popOverContent || '',
                        contentSrc = this.$attrs.popOverContentSrc,
                        poElement;
                    poElement = this.$compile(PopOverController.tpl.replace('##content##', content))(this.$scope);
                    this.popOverElement = angular.element(poElement)[0];
                    if (contentSrc) {
                        // default to selecting within $element
                        var src = this.$element[0].querySelectorAll(contentSrc)[0];
                        // if unsuccessful, try selecting within $document
                        src = src ? src : this.$document[0].querySelectorAll(contentSrc)[0];
                        if (!src) {
                            console.error('pop over content src does not exist');
                            return;
                        }
                        this.popOverElement.querySelectorAll('.popOver-contentInner')[0].appendChild(src);
                    }
                    // add any classes
                    if (this.$attrs.popOverCssClass) {
                        angular.element(this.popOverElement).addClass(this.$attrs.popOverCssClass);
                    }
                    // set any specified width limites
                    if (this.$attrs.popOverMaxWidth) {
                        this.popOverElement.style.maxWidth = this.$attrs.popOverMaxWidth + 'px';
                    }
                    // append to DOM
                    this.$document[0].body.appendChild(this.popOverElement);
                };
                PopOverController.prototype.removeFromDocument = function () {
                    this.$document[0].body.removeChild(this.popOverElement);
                };
                PopOverController.$inject = ['$scope', '$compile', '$window', '$document', '$element', '$attrs'];
                PopOverController.positions = {
                    bottom: 'bottom',
                    left: 'left',
                    right: 'right',
                    top: 'top'
                };
                PopOverController.tpl = "\n        <aside class=\"popOver-content\">\n            <div class=\"popOver-contentInner\">\n                ##content##\n            </div>\n            <span class=\"caret\"></span>\n        </aside>\n    ";
                return PopOverController;
            }();
            tempura = angular.module('tempura.popOver', ['tempura.utility.position']).directive('ghsPopOver', PopOver.instance);
        }
    };
});
$__System.register('3', [], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var TempuraPosition;
    return {
        setters: [],
        execute: function () {
            ///<reference path="../../typings/index.d.ts"/>
            TempuraPosition = function () {
                function TempuraPosition($document, $window) {
                    this.$document = $document;
                    this.$window = $window;
                }
                TempuraPosition.prototype.getRawNode = function (elem) {
                    return elem.nodeName ? elem : elem[0] || elem;
                };
                TempuraPosition.prototype.offset = function (elem) {
                    elem = this.getRawNode(elem);
                    var elemBCR = elem.getBoundingClientRect();
                    return {
                        width: Math.round(angular.isNumber(elemBCR.width) ? elemBCR.width : elem.offsetWidth),
                        height: Math.round(angular.isNumber(elemBCR.height) ? elemBCR.height : elem.offsetHeight),
                        top: Math.round(elemBCR.top + (this.$window.pageYOffset || this.$document[0].documentElement.scrollTop)),
                        left: Math.round(elemBCR.left + (this.$window.pageXOffset || this.$document[0].documentElement.scrollLeft))
                    };
                };
                TempuraPosition.prototype.offsetParent = function (elem) {
                    var _this = this;
                    elem = this.getRawNode(elem);
                    var offsetParent = elem.offsetParent || this.$document[0].documentElement;
                    var isStaticPositioned = function (el) {
                        return (_this.$window.getComputedStyle(el).position || 'static') === 'static';
                    };
                    while (offsetParent && offsetParent !== this.$document[0].documentElement && isStaticPositioned(offsetParent)) {
                        offsetParent = offsetParent.offsetParent;
                    }
                    return offsetParent || this.$document[0].documentElement;
                };
                TempuraPosition.prototype.position = function (elem) {
                    elem = this.getRawNode(elem);
                    var elemOffset = this.offset(elem);
                    var parent = this.offsetParent(elem);
                    var parentOffset = { top: 0, left: 0 };
                    if (parent !== this.$document[0].documentElement) {
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
                };
                TempuraPosition.$inject = ['$document', '$window'];
                return TempuraPosition;
            }();
            exports_1("TempuraPosition", TempuraPosition);
            angular.module('tempura.utility.position', []).service('tempuraPosition', TempuraPosition);
        }
    };
});
///<reference path="../../typings/index.d.ts"/>
$__System.register('4', [], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var TypeaheadParser;
    return {
        setters: [],
        execute: function () {
            TypeaheadParser = function () {
                function TypeaheadParser($parse) {
                    this.$parse = $parse;
                }
                TypeaheadParser.prototype.parse = function (input) {
                    var match = input.match(TypeaheadParser.TYPEAHEAD_REGEXP);
                    if (!match) {
                        throw new Error('Expected typeahead specification in form of "_modelValue_ (as _label_)? for _item_ in _collection_"' + ' but got "' + input + '".');
                    }
                    return {
                        itemName: match[3],
                        source: this.$parse(match[4]),
                        viewMapper: this.$parse(match[2] || match[1]),
                        modelMapper: this.$parse(match[1])
                    };
                };
                TypeaheadParser.$inject = ['$parse'];
                TypeaheadParser.TYPEAHEAD_REGEXP = /^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w\d]*))\s+in\s+([\s\S]+?)$/;
                return TypeaheadParser;
            }();
            exports_1("TypeaheadParser", TypeaheadParser);
            angular.module('tempura.typeahead-parser', []).service('typeaheadParser', TypeaheadParser);
        }
    };
});
(function() {
var define = $__System.amdDefine;
define("5", [], function() {
  return "<ul class=\"dropdown-menu\" ng-show=\"isOpen()\" ng-style=\"{top: position.top+'px', left: position.left+'px', width: '100%'}\" style=\"display: block;\" role=\"listbox\" aria-hidden=\"{{!isOpen()}}\">\n    <li ng-repeat=\"match in matches track by $index\" ng-class=\"{active: isActive($index) }\" ng-mouseenter=\"selectActive($index)\" ng-click=\"selectMatch($index)\" role=\"option\" id=\"{{match.id}}\">\n        <div ghs-typeahead-match index=\"$index\" match=\"match\" query=\"query\" template-url=\"templateUrl\"></div>\n    </li>\n</ul>\n";
});

})();
///<reference path="../../typings/index.d.ts"/>
$__System.register('6', [], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            angular.module('tempura.utility.debounce', []).factory('$$debounce', ['$timeout', function ($timeout) {
                return function (callback, debounceTime) {
                    var timeoutPromise;
                    return function () {
                        var self = this;
                        var args = Array.prototype.slice.call(arguments);
                        if (timeoutPromise) {
                            $timeout.cancel(timeoutPromise);
                        }
                        timeoutPromise = $timeout(function () {
                            callback.apply(self, args);
                        }, debounceTime);
                    };
                };
            }]);
        }
    };
});
$__System.register('7', ['5', '6'], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var typeahead_popup_html_text_1;
    var TypeaheadPopup, tempura;
    return {
        setters: [function (typeahead_popup_html_text_1_1) {
            typeahead_popup_html_text_1 = typeahead_popup_html_text_1_1;
        }, function (_1) {}],
        execute: function () {
            TypeaheadPopup = function () {
                function TypeaheadPopup($$debounce, $templateCache) {
                    var _this = this;
                    this.$$debounce = $$debounce;
                    this.$templateCache = $templateCache;
                    this.scope = {
                        matches: '<',
                        query: '<',
                        active: '=',
                        position: '<',
                        moveInProgress: '<',
                        select: '&',
                        assignIsOpen: '&',
                        debounce: '&',
                        templateUrl: '@'
                    };
                    this.replace = true;
                    this.templateUrl = function (element, attrs) {
                        if (!attrs.popupTemplateUrl) {
                            _this.$templateCache.put('typeahead/template/typeahead-popup.html', typeahead_popup_html_text_1.default);
                        }
                        return attrs.popupTemplateUrl || 'typeahead/template/typeahead-popup.html';
                    };
                    this.link = function (scope, element, attrs) {
                        scope.templateUrl = attrs.templateUrl;
                        scope.isOpen = function () {
                            var isDropdownOpen = scope.matches.length > 0;
                            scope.assignIsOpen({ isOpen: isDropdownOpen });
                            return isDropdownOpen;
                        };
                        scope.isActive = function (matchIdx) {
                            return scope.active === matchIdx;
                        };
                        scope.selectActive = function (matchIdx) {
                            scope.active = matchIdx;
                        };
                        scope.selectMatch = function (activeIdx, evt) {
                            var debounce = scope.debounce();
                            if (angular.isNumber(debounce) || angular.isObject(debounce)) {
                                this.$$debounce(function () {
                                    scope.select({ activeIdx: activeIdx, evt: evt });
                                }, angular.isNumber(debounce) ? debounce : debounce['default']);
                            } else {
                                scope.select({ activeIdx: activeIdx, evt: evt });
                            }
                        };
                    };
                }
                TypeaheadPopup.instance = function () {
                    var directive = function ($$debounce, $templateCache) {
                        return new TypeaheadPopup($$debounce, $templateCache);
                    };
                    directive.$inject = ['$$debounce', '$templateCache'];
                    return directive;
                };
                return TypeaheadPopup;
            }();
            exports_1("TypeaheadPopup", TypeaheadPopup);
            tempura = angular.module('tempura.typeahead.popup', []).directive('ghsTypeaheadPopup', TypeaheadPopup.instance());
        }
    };
});
(function() {
var define = $__System.amdDefine;
define("8", [], function() {
  return "<a tabindex=\"-1\" ng-bind-html=\"match.label | ghsTypeaheadSanitize:query\"></a>\n";
});

})();
$__System.register('9', ['8'], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var typeahead_match_html_text_1;
    var TypeaheadMatch, TypeaheadMatchFilterFactory, TypeaheadMatchFilter, tempura;
    return {
        setters: [function (typeahead_match_html_text_1_1) {
            typeahead_match_html_text_1 = typeahead_match_html_text_1_1;
        }],
        execute: function () {
            TypeaheadMatch = function () {
                function TypeaheadMatch($templateRequest, $compile, $parse, $templateCache) {
                    var _this = this;
                    this.$templateRequest = $templateRequest;
                    this.$compile = $compile;
                    this.$parse = $parse;
                    this.$templateCache = $templateCache;
                    this.link = function (scope, element, attrs) {
                        if (!_this.$parse(attrs.templateUrl)(scope.$parent)) {
                            _this.$templateCache.put('typeahead/template/typeahead-match.html', typeahead_match_html_text_1.default);
                        }
                        var tplUrl = _this.$parse(attrs.templateUrl)(scope.$parent) || 'typeahead/template/typeahead-match.html';
                        _this.$templateRequest(tplUrl).then(function (tplContent) {
                            var tplEl = angular.element(tplContent.trim());
                            element.replaceWith(tplEl);
                            _this.$compile(tplEl)(scope);
                        });
                    };
                    this.restrict = 'A';
                    this.scope = {
                        index: '<',
                        match: '<',
                        query: '<'
                    };
                }
                TypeaheadMatch.instance = function () {
                    var directive = function ($templateRequest, $compile, $parse, $templateCache) {
                        return new TypeaheadMatch($templateRequest, $compile, $parse, $templateCache);
                    };
                    directive.$inject = ['$templateRequest', '$compile', '$parse', '$templateCache'];
                    return directive;
                };
                ;
                return TypeaheadMatch;
            }();
            exports_1("TypeaheadMatch", TypeaheadMatch);
            TypeaheadMatchFilterFactory = function () {
                function TypeaheadMatchFilterFactory() {}
                TypeaheadMatchFilterFactory.Factory = function () {
                    var filter = TypeaheadMatchFilter;
                    filter.$inject = ['$injector', '$sce'];
                    return filter;
                };
                return TypeaheadMatchFilterFactory;
            }();
            exports_1("TypeaheadMatchFilterFactory", TypeaheadMatchFilterFactory);
            TypeaheadMatchFilter = function () {
                function TypeaheadMatchFilter($injector, $sce) {
                    var _this = this;
                    this.$injector = $injector;
                    this.$sce = $sce;
                    this.$filter = function (matchItem, query) {
                        if (!_this.isSanitizePresent && TypeaheadMatchFilter.containsHtml(matchItem)) {
                            $log.warn('Unsafe use of typeahead please use ngSanitize'); // Warn the user about the danger
                        }
                        matchItem = matchItem + ''; // make sure it's a string
                        if (!_this.isSanitizePresent) {
                            matchItem = _this.$sce.trustAsHtml(matchItem); // If $sanitize is not present we pack the string in a $sce object for the ng-bind-html directive
                        }
                        return matchItem;
                    };
                    this.isSanitizePresent = this.$injector.has('$sanitize');
                    return this.$filter;
                }
                TypeaheadMatchFilter.containsHtml = function (matchItem) {
                    return (/<.*>/g.test(matchItem)
                    );
                };
                return TypeaheadMatchFilter;
            }();
            exports_1("TypeaheadMatchFilter", TypeaheadMatchFilter);
            tempura = angular.module('tempura.typeahead.match', []).directive('ghsTypeaheadMatch', TypeaheadMatch.instance()).filter('ghsTypeaheadSanitize', TypeaheadMatchFilterFactory.Factory());
        }
    };
});
///<reference path="../../typings/index.d.ts"/>
$__System.register('a', ['3', '6', '4', '7', '9'], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var Typeahead, TypeaheadLink, TypeaheadController, tempura;
    return {
        setters: [function (_1) {}, function (_2) {}, function (_3) {}, function (_4) {}, function (_5) {}],
        execute: function () {
            Typeahead = function () {
                function Typeahead() {
                    this.controller = TypeaheadController;
                    this.link = function ($scope, $element, $attrs, ctrls) {
                        //trigger init for the ng-model and ng-model-options references
                        ctrls[2].init(ctrls[0], ctrls[1]);
                    };
                    this.restrict = 'A';
                    this.require = ['ngModel', '^?ngModelOptions', 'ghsTypeahead'];
                    this.bindToController = {
                        minLength: '<?typeaheadMinLength',
                        waitTime: '<?typeaheadWaitMs',
                        isEditable: '<?typeaheadEditable',
                        shouldSelect: '&?typeaheadShouldSelect',
                        onSelectCallback: '&?typeaheadOnSelect',
                        shouldSelectOnBlur: '<?typeaheadSelectOnBlur',
                        noResults: '=?typeaheadNoResults',
                        inputFormatter: '&?typeaheadInputFormatter',
                        appendToBody: '<?typeaheadAppendToBody',
                        appendTo: '<?typeaheadAppendTo',
                        focusFirst: '<?typeaheadFocusFirst',
                        focusOnSelect: '<?typeaheadFocusOnSelect',
                        selectOnExact: '<?typeaheadSelectOnExact',
                        isOpen: '=?typeaheadIsOpen',
                        typeaheadTemplateUrl: '@?',
                        typeaheadPopupTemplateUrl: '@?',
                        isLoading: '=?typeaheadLoading'
                    };
                    this.controllerAs = 'taVm';
                }
                Typeahead.instance = function () {
                    return new Typeahead();
                };
                return Typeahead;
            }();
            exports_1("Typeahead", Typeahead);
            // Breaking in unit tests right now :(
            TypeaheadLink = function () {
                function TypeaheadLink($scope, $element, $attrs, ctrls) {
                    this.$scope = $scope;
                    this.$element = $element;
                    this.$attrs = $attrs;
                    this.ctrls = ctrls;
                    //trigger init for the ng-model and ng-model-options references
                    ctrls[2].init(ctrls[0], ctrls[1]);
                }
                return TypeaheadLink;
            }();
            TypeaheadController = function () {
                function TypeaheadController($scope, $element, $attrs, $compile, $parse, $q, $timeout, $document, $window, $rootScope, tempuraPosition, typeaheadParser, $$debounce) {
                    var _this = this;
                    this.$scope = $scope;
                    this.$element = $element;
                    this.$attrs = $attrs;
                    this.$compile = $compile;
                    this.$parse = $parse;
                    this.$q = $q;
                    this.$timeout = $timeout;
                    this.$document = $document;
                    this.$window = $window;
                    this.$rootScope = $rootScope;
                    this.tempuraPosition = tempuraPosition;
                    this.typeaheadParser = typeaheadParser;
                    this.$$debounce = $$debounce;
                    this.eventDebounceTime = 200;
                    this.assignIsOpen = function (isOpen) {
                        _this.isOpen = isOpen;
                    };
                    this.select = function (activeIdx, evt) {
                        //called from within the $digest() cycle
                        var locals = {},
                            model,
                            item;
                        locals[_this.parserResult.itemName] = item = _this.matches[activeIdx].model;
                        //do nothing if item is disabled
                        if (item.ngDisabled) {
                            return;
                        }
                        _this.selected = true;
                        model = _this.parserResult.modelMapper(_this.$scope, locals);
                        _this.$setModelValue(_this.$scope, model);
                        _this.modelCtrl.$setValidity('editable', true);
                        _this.modelCtrl.$setValidity('parse', true);
                        _this.onSelectCallback({
                            $item: item,
                            $model: model,
                            $label: _this.parserResult.viewMapper(_this.$scope, locals),
                            $event: evt
                        });
                        _this.resetMatches();
                        //return focus to the input element if a match was selected via a mouse click event
                        // use timeout to avoid $rootScope:inprog error
                        if (_this.focusOnSelect !== false) {
                            _this.$timeout(function () {
                                _this.$element[0].focus();
                            }, 0, false);
                        }
                    };
                    this.getMatchesAsync = function (inputValue, evt) {
                        var locals = { $viewValue: inputValue };
                        _this.isLoading = true;
                        _this.noResults = false;
                        _this.$q.when(_this.parserResult.source(_this.$scope, locals)).then(function (matches) {
                            //it might happen that several async queries were in progress if a user were typing fast
                            //but we are interested only in responses that correspond to the current view value
                            var onCurrentRequest = inputValue === _this.modelCtrl.$viewValue;
                            if (onCurrentRequest && _this.hasFocus) {
                                if (matches && matches.length > 0) {
                                    _this.activeIdx = _this.focusFirst ? 0 : -1;
                                    _this.noResults = false;
                                    _this.matches.length = 0;
                                    //transform labels
                                    for (var i = 0; i < matches.length; i++) {
                                        locals[_this.parserResult.itemName] = matches[i];
                                        _this.matches.push({
                                            id: _this.getMatchId(i),
                                            label: _this.parserResult.viewMapper(_this, locals),
                                            model: matches[i]
                                        });
                                    }
                                    _this.query = inputValue;
                                    //position pop-up with matches - we need to re-calculate its position each time we are opening a window
                                    //with matches as a pop-up might be absolute-positioned and position of an input might have changed on a page
                                    //due to other elements being rendered
                                    _this.recalculatePosition();
                                    _this.$element.attr('aria-expanded', 'true');
                                    //Select the single remaining option if user input matches
                                    if (_this.selectOnExact && _this.matches.length === 1 && _this.inputIsExactMatch(inputValue, 0)) {
                                        if (angular.isNumber(_this.debounceUpdate) || angular.isObject(_this.debounceUpdate)) {
                                            _this.$$debounce(function () {
                                                _this.select(0, evt);
                                            }, angular.isNumber(_this.debounceUpdate) ? _this.debounceUpdate : _this.debounceUpdate['default']);
                                        } else {
                                            _this.select(0, evt);
                                        }
                                    }
                                } else {
                                    _this.resetMatches();
                                    _this.noResults = true;
                                }
                            }
                            if (onCurrentRequest) {
                                _this.isLoading = false;
                            }
                        }, function () {
                            _this.resetMatches();
                            _this.isLoading = false;
                            _this.noResults = true;
                        });
                    };
                    this.$setModelValue = function (scope, newValue) {
                        if (angular.isFunction(_this.parsedModel(_this.$scope)) && _this.ngModelOptions && _this.ngModelOptions.$options && _this.ngModelOptions.$options.getterSetter) {
                            return _this.invokeModelSetter(scope, { $$$p: newValue });
                        }
                        return _this.parsedModel.assign(scope, newValue);
                    };
                    this.resetMatches = function () {
                        _this.matches = [];
                        _this.activeIdx = -1;
                        _this.$element.attr('aria-expanded', 'false');
                    };
                    this.inputIsExactMatch = function (inputValue, index) {
                        if (_this.matches.length > index && inputValue) {
                            return inputValue.toUpperCase() === _this.matches[index].label.toUpperCase();
                        }
                        return false;
                    };
                    this.getMinLength = function () {
                        return !_this.minLength && _this.minLength !== 0 ? 1 : _this.minLength;
                    };
                    this.getMatchId = function (index) {
                        return _this.popupId + '-option-' + index;
                    };
                    this.fireRecalculating = function () {
                        if (!_this.moveInProgress) {
                            _this.moveInProgress = true;
                            _this.$scope.$digest();
                        }
                        _this.debouncedRecalculate();
                    };
                    this.scheduleSearchWithTimeout = function (inputValue) {
                        _this.timeoutPromise = _this.$timeout(function () {
                            _this.getMatchesAsync(inputValue);
                        }, _this.waitTime);
                    };
                    this.cancelPreviousTimeout = function () {
                        if (_this.timeoutPromise) {
                            _this.$timeout.cancel(_this.timeoutPromise);
                        }
                    };
                    // Declare the debounced function outside recalculating for
                    // proper debouncing
                    this.debouncedRecalculate = this.$$debounce(function () {
                        // if popup is visible
                        if (_this.matches.length) {
                            _this.recalculatePosition();
                        }
                        _this.moveInProgress = false;
                    }, this.eventDebounceTime);
                    this.recalculatePosition = function () {
                        _this.position = _this.appendToBody ? _this.tempuraPosition.offset(_this.$element) : _this.tempuraPosition.position(_this.$element);
                        _this.position.top += _this.$element.prop('offsetHeight');
                    };
                    this.dismissClickHandler = function (evt) {
                        // Issue #3973
                        // Firefox treats right click as a click on document
                        if (!_this.touchMove && _this.$element[0] !== evt.target && evt.which !== 3 && _this.matches.length !== 0) {
                            _this.resetMatches();
                            if (!_this.$rootScope.$$phase) {
                                _this.$scope.$digest();
                            }
                        }
                    };
                    this.touchStartHandler = function (evt) {
                        _this.touchMove = false;
                    };
                    this.touchMoveHandler = function (evt) {
                        _this.touchMove = true;
                    };
                    /**
                     * handle aria bindings
                     *
                     */
                    this.initAria = function () {
                        _this.popupId = 'typeahead-' + _this.$scope.$id + '-' + Math.floor(Math.random() * 10000);
                        _this.$element.attr({
                            'aria-autocomplete': 'list',
                            'aria-expanded': false,
                            'aria-owns': _this.popupId
                        });
                    };
                    this.initPopupEl = function () {
                        _this.popUpEl = angular.element('<div ghs-typeahead-popup></div>');
                        _this.popUpEl.attr({
                            id: _this.popupId,
                            matches: 'taVm.matches',
                            active: 'taVm.activeIdx',
                            select: 'taVm.select(activeIdx, evt)',
                            'move-in-progress': 'taVm.moveInProgress',
                            query: 'taVm.query',
                            position: 'taVm.position',
                            'assign-is-open': 'taVm.assignIsOpen(isOpen)',
                            debounce: 'taVm.debounceUpdate'
                        });
                        if (angular.isDefined(_this.typeaheadTemplateUrl)) {
                            _this.popUpEl.attr('template-url', _this.typeaheadTemplateUrl);
                        }
                        if (angular.isDefined(_this.typeaheadPopupTemplateUrl)) {
                            _this.popUpEl.attr('popup-template-url', _this.typeaheadPopupTemplateUrl);
                        }
                    };
                    this.initWatchers = function () {
                        var $rootListeners = {
                            activeIndex: _this.$scope.$watch(function () {
                                return _this.activeIdx;
                            }, function (index) {
                                if (!angular.isDefined(index) || index < 0) {
                                    _this.$element.removeAttr('aria-activedescendant');
                                } else {
                                    _this.$element.attr('aria-activedescendant', _this.getMatchId(index));
                                }
                            })
                        };
                        if (_this.appendToBody) {
                            angular.element(_this.$window).on('resize', _this.fireRecalculating);
                            _this.$document.find('body').on('scroll', _this.fireRecalculating);
                        }
                        _this.$scope.$on('$destroy', function () {
                            angular.element(_this.$window).off('resize', _this.fireRecalculating);
                            _this.$document.find('body').off('scroll', _this.fireRecalculating);
                            _this.$document.off('click touchend', _this.dismissClickHandler);
                            _this.$document.off('touchstart', _this.touchStartHandler);
                            _this.$document.off('touchmove', _this.touchMoveHandler);
                            if (_this.appendToBody || _this.appendTo) {
                                _this.$popup.remove();
                            }
                            _this.popUpEl.remove();
                        });
                        for (var unbind in $rootListeners) {
                            _this.$scope.$on('$destroy', $rootListeners[unbind]);
                        }
                    };
                    this.initEventBindings = function () {
                        //bind keyboard events: arrows up(38) / down(40), enter(13) and tab(9), esc(27)
                        _this.$element.on('keydown', function (evt) {
                            console.log(_this);
                            console.log(evt);
                            //typeahead is open and an "interesting" key was pressed
                            if (_this.matches.length === 0 || TypeaheadController.HOT_KEYS.indexOf(evt.which) === -1) {
                                return;
                            }
                            var shouldSelectBoolean = _this.shouldSelect({ $event: evt });
                            /**
                             * if there's nothing selected (i.e. focusFirst) and enter or tab is hit
                             * or
                             * shift + tab is pressed to bring focus to the previous element
                             * then clear the results
                             */
                            if (_this.activeIdx === -1 && shouldSelectBoolean || evt.which === 9 && !!evt.shiftKey) {
                                _this.resetMatches();
                                _this.$scope.$digest();
                                return;
                            }
                            evt.preventDefault();
                            var target;
                            switch (evt.which) {
                                case 27:
                                    evt.stopPropagation();
                                    _this.resetMatches();
                                    _this.$scope.$digest();
                                    break;
                                case 38:
                                    _this.activeIdx = (_this.activeIdx > 0 ? _this.activeIdx : _this.matches.length) - 1;
                                    _this.$scope.$digest();
                                    break;
                                case 40:
                                    _this.activeIdx = (_this.activeIdx + 1) % _this.matches.length;
                                    _this.$scope.$digest();
                                    break;
                                default:
                                    if (shouldSelectBoolean) {
                                        _this.$scope.$apply(function () {
                                            if (angular.isNumber(_this.debounceUpdate) || angular.isObject(_this.debounceUpdate)) {
                                                _this.$$debounce(function () {
                                                    _this.select(_this.activeIdx, evt);
                                                }, angular.isNumber(_this.debounceUpdate) ? _this.debounceUpdate : _this.debounceUpdate['default']);
                                            } else {
                                                _this.select(_this.activeIdx, evt);
                                            }
                                        });
                                    }
                            }
                        });
                        _this.$element.bind('focus', function (evt) {
                            _this.hasFocus = true;
                            // @TODO (adasilva) not sure what this is about
                            if (_this.minLength === 0 && !_this.modelCtrl.$viewValue) {
                                _this.$timeout(function () {
                                    _this.getMatchesAsync(_this.modelCtrl.$viewValue, evt);
                                }, 0);
                            } else if (_this.modelCtrl.$viewValue && _this.minLength <= _this.modelCtrl.$viewValue.length) {
                                _this.$timeout(function () {
                                    _this.getMatchesAsync(_this.modelCtrl.$viewValue, evt);
                                }, 0);
                            }
                        });
                        _this.$element.bind('blur', function (evt) {
                            if (_this.shouldSelectOnBlur && _this.matches.length && _this.activeIdx !== -1 && !_this.selected) {
                                _this.selected = true;
                                _this.$scope.$apply(function () {
                                    if (angular.isObject(_this.debounceUpdate) && angular.isNumber(_this.debounceUpdate.blur)) {
                                        _this.$$debounce(function () {
                                            this.select(this.activeIdx, evt);
                                        }, _this.debounceUpdate.blur);
                                    } else {
                                        _this.select(_this.activeIdx, evt);
                                    }
                                });
                            }
                            if (!_this.isEditable && _this.modelCtrl.$error.editable) {
                                _this.modelCtrl.$setViewValue();
                                _this.$scope.$apply(function () {
                                    // Reset validity as we are clearing
                                    _this.modelCtrl.$setValidity('editable', true);
                                    _this.modelCtrl.$setValidity('parse', true);
                                });
                                _this.$element.val('');
                            }
                            _this.hasFocus = false;
                            _this.selected = false;
                        });
                        _this.$document.on('touchstart', _this.touchStartHandler);
                        _this.$document.on('touchmove', _this.touchMoveHandler);
                        _this.$document.on('click touchend', _this.dismissClickHandler);
                    };
                    this.compilePopup = function () {
                        _this.$popup = _this.$compile(_this.popUpEl)(_this.$scope);
                        if (_this.appendToBody) {
                            _this.$document.find('body').append(_this.$popup);
                        } else if (_this.appendTo) {
                            angular.element(_this.appendTo).eq(0).append(_this.$popup);
                        } else {
                            _this.$element.after(_this.$popup);
                        }
                    };
                    this.defaultBindings = function () {
                        if (!_this.minLength && _this.minLength !== 0) {
                            _this.minLength = 1;
                        }
                        _this.waitTime = _this.waitTime ? _this.waitTime : 0;
                        _this.isEditable = _this.isEditable !== false;
                        _this.shouldSelectOnBlur = angular.isDefined(_this.shouldSelectOnBlur) ? _this.shouldSelectOnBlur : false;
                        _this.shouldSelect = _this.shouldSelect ? _this.shouldSelect : function (vals) {
                            var evt = vals.$event;
                            return evt.which === 13 || evt.which === 9;
                        };
                        _this.appendToBody = !!_this.appendToBody;
                        _this.appendTo = _this.appendTo || null;
                        _this.focusFirst = _this.focusFirst !== false;
                        _this.selectOnExact = !!_this.selectOnExact;
                        _this.onSelectCallback = _this.onSelectCallback || angular.noop;
                    };
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
                TypeaheadController.prototype.init = function (_modelCtrl, _ngModelOptions) {
                    var _this = this;
                    this.modelCtrl = _modelCtrl;
                    this.ngModelOptions = _ngModelOptions;
                    this.debounceUpdate = this.modelCtrl.$options && this.$parse(this.modelCtrl.$options.debounce)(this.$scope);
                    //plug into $parsers pipeline to open a typeahead on view changes initiated from DOM
                    //$parsers kick-in on all the changes coming from the view as well as manually triggered by $setViewValue
                    this.modelCtrl.$parsers.unshift(function (inputValue) {
                        _this.hasFocus = true;
                        if (_this.minLength === 0 || inputValue && inputValue.length >= _this.minLength) {
                            if (_this.waitTime > 0) {
                                _this.cancelPreviousTimeout();
                                _this.scheduleSearchWithTimeout(inputValue);
                            } else {
                                _this.getMatchesAsync(inputValue);
                            }
                        } else {
                            _this.isLoading = false;
                            _this.cancelPreviousTimeout();
                            _this.resetMatches();
                        }
                        if (_this.isEditable) {
                            return inputValue;
                        }
                        if (!inputValue) {
                            // Reset in case user had typed something previously.
                            _this.modelCtrl.$setValidity('editable', true);
                            return null;
                        }
                        _this.modelCtrl.$setValidity('editable', false);
                        return undefined;
                    });
                    this.modelCtrl.$formatters.push(function (modelValue) {
                        var candidateViewValue,
                            emptyViewValue,
                            locals = {};
                        // The validity may be set to false via $parsers (see above) if
                        // the model is restricted to selected values. If the model
                        // is set manually it is considered to be valid.
                        if (!_this.isEditable) {
                            _this.modelCtrl.$setValidity('editable', true);
                        }
                        if (_this.inputFormatter) {
                            locals.$model = modelValue;
                            return _this.inputFormatter(locals);
                        }
                        //it might happen that we don't have enough info to properly render input value
                        //we need to check for this situation and simply return model value if we can't apply custom formatting
                        locals[_this.parserResult.itemName] = modelValue;
                        candidateViewValue = _this.parserResult.viewMapper(_this.$scope, locals);
                        locals[_this.parserResult.itemName] = undefined;
                        emptyViewValue = _this.parserResult.viewMapper(_this.$scope, locals);
                        return candidateViewValue !== emptyViewValue ? candidateViewValue : modelValue;
                    });
                };
                TypeaheadController.$inject = ['$scope', '$element', '$attrs', '$compile', '$parse', '$q', '$timeout', '$document', '$window', '$rootScope', 'tempuraPosition', 'typeaheadParser', '$$debounce'];
                TypeaheadController.HOT_KEYS = [9, 13, 27, 38, 40];
                return TypeaheadController;
            }();
            tempura = angular.module('tempura.typeahead', ['tempura.typeahead.popup', 'tempura.typeahead.match', 'tempura.typeahead-parser', 'tempura.utility.position', 'tempura.utility.debounce']).directive('ghsTypeahead', Typeahead.instance);
        }
    };
});
$__System.register('1', ['2', 'a'], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var tempura;
    return {
        setters: [function (_1) {}, function (_2) {}],
        execute: function () {
            tempura = angular.module('tempura', ['tempura.popOver', 'tempura.typeahead']);
        }
    };
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define([], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory();
  else
    factory();
});