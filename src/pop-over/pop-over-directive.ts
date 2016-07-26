///<reference path="../../typings/index.d.ts"/>


export class PopOver implements ng.IDirective {

    public controller: any = PopOverController;
    public restrict: string = 'A';
    public bindToController: any = false;
    public scope: any = false;

    public static instance (): ng.IDirective {
        return new PopOver();
    }

    public link: any = (scope: ng.IScope,
                        element: ng.IRootElementService,
                        attrs: any,
                        ctrl: PopOverController): void => {

        // if on start its disabled, then don't do anything
        if (attrs.popOverDisabled !== 'true') {
            ctrl.initialize();
        }

        if (attrs.popOverEnableWatchers === 'true') {
            ctrl.addWatchers();
        }

    };

}

class PopOverController {

    public static $inject: Array<string> = [
        '$scope',
        '$compile',
        '$window',
        '$document',
        '$element',
        '$attrs'];
    public static positions: any = {
        bottom: 'bottom',
        left: 'left',
        right: 'right',
        top: 'top'
    };

    public static tpl: string = `
        <aside class="popOver-content">
            <div class="popOver-contentInner">
                ##content##
            </div>
            <span class="caret"></span>
        </aside>
    `;

    public popOverElement: any;
    public position: string;
    public triggers: Array<string>;
    public closers: Array<string>;
    public isInitialized: boolean = false;

    private isActive: boolean;
    private hidePopOverTimer: any;
    private showPopOverTimer: any;
    private isClick: boolean;
    private isHover: boolean;
    private isFocus: boolean;

    constructor (private $scope,
                 private $compile,
                 private $window,
                 private $document,
                 private $element,
                 private $attrs) {

        // remove events
        this.$scope.$on('$destroy', () => {
            if (!this.isInitialized) {
                return;
            }
            this.removeEventListeners();
            this.removeFromDocument();
        });

    }

    public initialize (): void {
        this.createAndAttachPopOver();
        this.parseEventsToHandle();
        this.addEventListeners();

        this.isInitialized = true;
    }

    public addWatchers () {
        this.$scope.$watch(() => {
            return this.$attrs.popOverDisabled;
        }, (isDisabled) => {
            if (isDisabled === 'true' && this.isInitialized) {
                this.removeEventListeners();
            } else {
                if (!this.isInitialized) {
                    this.initialize();
                } else {
                    this.addEventListeners();
                }
            }
        });

        this.$scope.$watch(() => {
           return this.$attrs.popOverMakeActive;
        }, (isActive) => {
            if (isActive === 'true') {
                if (!this.isInitialized) {
                    this.initialize();
                }
                this.showPopOverHandler();
            } else {
                this.hidePopOverHandler();
            }
        });
    }

    private parseEventsToHandle (): void {

        let triggers = this.$attrs.popOverTriggers,
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
            this.triggers = /button|input/i.test(tagName) ?
                ['focus'] :
                ['mouseover', 'touchstart']; // default based upon tag type
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

    }

    private addEventListeners (): void {
        let element = this.$element[0];

        // since click is a toggle there is no separate closing event
        if (this.isClick) {
            element.addEventListener('click', this.showPopOver);
            element.addEventListener('touchstart', this.showPopOver);
            return;
        }

        // all others
        this.triggers.forEach((trigger) => {
            element.addEventListener(trigger, this.showPopOver);
        });

        this.closers.forEach((closer) => {
            // for the touchend event we add a longer delay
            element.addEventListener(closer, this.hidePopOver);
        });

        this.popOverElement.addEventListener('mouseover', this.cancelHideTimer);
        this.popOverElement.addEventListener('mouseout', this.hidePopOver);

    }

    private removeEventListeners (): void {
        let element = this.$element[0];

        if (this.isClick) {
            element.removeEventListener('click', this.showPopOver);
            element.removeEventListener('touchstart', this.showPopOver);
            return;
        }

        this.triggers.forEach((trigger) => {
            element.removeEventListener(trigger, this.showPopOver);
        });

        this.closers.forEach((closer) => {
            element.removeEventListener(closer, this.hidePopOver);
        });

        this.popOverElement.removeEventListener('mouseover', this.cancelHideTimer);
        this.popOverElement.removeEventListener('mouseout', this.hidePopOver);
    }

    private getReferencePoints (event?: any): any {

        let elemBounds: any = this.$element[0].getBoundingClientRect(),
            bodyBounds: any = this.$document[0].body.getBoundingClientRect(),
            poBounds: any = this.popOverElement.getBoundingClientRect(),
            useMouseTarget = this.$attrs.popOverUseMouseTarget === 'true',
            _leftPos: number,
            _topPos: number;

        if (useMouseTarget) {
            _leftPos = event.clientX - bodyBounds.left;
            _topPos = event.clientY - bodyBounds.top;
        } else {
            // center of target element
            _leftPos = elemBounds.left - bodyBounds.left + (elemBounds.width / 2);
            _topPos = elemBounds.top - bodyBounds.top + (elemBounds.height / 2);
        }

        switch (this.position) {
            case PopOverController.positions.top:
                _leftPos -= poBounds.width / 2;
                _topPos -= poBounds.height + (elemBounds.height / 2);
                break;
            case PopOverController.positions.left:
                _leftPos -= poBounds.width;
                _topPos -= poBounds.height / 2;
                break;
            case PopOverController.positions.right:
                _topPos -= poBounds.height / 2;
                break;
            default: // bottom
                _leftPos -= poBounds.width / 2;
                _topPos += (elemBounds.height / 2);
        }

        return {
            left: _leftPos,
            top: _topPos
        };

    }

    private setPopOverPosition (event?: any): void {

        this.position = this.$attrs.position || PopOverController.positions.bottom; // bottom is default

        let poBounds: any = this.popOverElement.getBoundingClientRect(),
            screenWidth = this.$document[0].documentElement.clientWidth,
            verticalOffset = parseInt(this.$attrs.popOverVerticalOffset, 10) || 0,
            horizontalOffset = parseInt(this.$attrs.popOverHorizontalOffset, 10) || 10;

        let referencePoints = this.getReferencePoints(event);

        // force left and right to use top if offscreen
        if ((this.position === PopOverController.positions.right && referencePoints.left + poBounds.width > screenWidth) ||
            (this.position === PopOverController.positions.left && referencePoints.left - poBounds.width < 0 )) {
            this.position = PopOverController.positions.bottom;
            // redefine position points
            referencePoints = this.getReferencePoints(event);
        }


        // set styles based upon position
        let top = 'auto',
            left = 'auto',
            right = 'auto';

        switch (this.position) {

            case PopOverController.positions.top:
            case  PopOverController.positions.bottom:
                let _left: number = referencePoints.left;
                // if element would be off screen then set to 0
                _left = (_left < 0) ? 0 : _left;

                top = (this.position === PopOverController.positions.top ?
                        (referencePoints.top - verticalOffset) :
                        (referencePoints.top + verticalOffset)) + 'px';

                // check right overflow
                if (_left + poBounds.width > screenWidth) {
                    left = 'auto';
                    right = '0';
                } else {
                    left = _left + 'px';
                }

                break;
            case PopOverController.positions.right :
            case PopOverController.positions.left:
                left = (this.position === PopOverController.positions.left ?
                    referencePoints.left - horizontalOffset :
                    referencePoints.left + horizontalOffset) + 'px';
                let _top: number = referencePoints.top;
                top = (_top < 0) ? '0' : _top + 'px';
                break;
            default:
                break;
        }

        let poStyle = this.popOverElement.style;
        // set values
        poStyle.left = left;
        poStyle.right = right;
        poStyle.top = top;


        // first remove any lingering classes
        for (let pos in PopOverController.positions) {
            angular.element(this.popOverElement).removeClass(pos);
        }
        angular.element(this.popOverElement).addClass(this.position);

    }

    private moveCaret (): void {

        let caret = this.popOverElement.querySelectorAll('.caret')[0],
            useMouseTarget = this.$attrs.popOverUseMouseTarget === 'true',
            caretBounds = caret.getBoundingClientRect();

        if (!caret) {
            return;
        }

        let poBounds = this.popOverElement.getBoundingClientRect(),
            elemBounds = this.$element[0].getBoundingClientRect();

        if (this.position === PopOverController.positions.top || this.position === PopOverController.positions.bottom) {

            let _left = -1 * (caretBounds.width / 2),
                poHorizontalCenter = poBounds.left + (poBounds.width / 2),
                elemHorizontalCenter = elemBounds.left + (elemBounds.width / 2 );

            if (poHorizontalCenter === elemHorizontalCenter || useMouseTarget) {
                _left += (poBounds.width / 2);
            } else {
                _left += (elemBounds.left - poBounds.left) + (elemBounds.width / 2);
            }

            caret.style.left = _left + 'px';
            if (this.position === PopOverController.positions.top) {
                caret.style.bottom = (-1 * caretBounds.height ) + 'px';
            } else {
                caret.style.top = (-1 * caretBounds.height ) + 'px';
            }

        } else {
            // right || left
            let _top = -1 * (caretBounds.height / 2),
                poVerticalCenter = poBounds.top + (poBounds.height / 2),
                elemVerticalCenter = elemBounds.top + (elemBounds.height / 2);

            if (poVerticalCenter === elemVerticalCenter || useMouseTarget) {
                // just subtract the caret height
                _top += (poBounds.height / 2);

            } else {
                _top += (elemBounds.top - poBounds.top) + (elemBounds.height / 2);
            }

            caret.style.top = _top + 'px';
            if (this.position === PopOverController.positions.right) {
                caret.style.left = (-1 * caretBounds.width ) + 'px';
            } else {
                caret.style.right = (-1 * caretBounds.width ) + 'px';
            }

        }

    }

    private scrollToPopOver (): void {
        let poBounds = this.popOverElement.getBoundingClientRect(),
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
    }

    private createAndAttachPopOver (): void {
        let content = this.$attrs.popOverContent || '',
            contentSrc = this.$attrs.popOverContentSrc,
            poElement;

        poElement = this.$compile(PopOverController.tpl.replace('##content##', content))(this.$scope);

        this.popOverElement = angular.element(poElement)[0];

        if (contentSrc) {
            // default to selecting within $element
            let src = this.$element[0].querySelectorAll(contentSrc)[0];

            // if unsuccessful, try selecting within $document
            src = src ? src : this.$document[0].querySelectorAll(contentSrc)[0];
            if (!src) {
                console.error('pop over content src does not exist');
                return;
            }
            this.popOverElement
                .querySelectorAll('.popOver-contentInner')[0]
                .appendChild(src);
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
    }

    private removeFromDocument (): void {
        this.$document[0].body.removeChild(this.popOverElement);
    }

    /// DOM EVENT HANDLERS

    private showPopOver = (event?: any): void => {

        this.cancelHideTimer();
        this.cancelShowItmer();

        setTimeout(() => {
            if (/click/i.test(event.type)) {
                if (!this.isActive) {
                    this.showPopOverHandler(event);
                } else {
                    this.hidePopOverHandler();
                }
            } else {
                this.showPopOverHandler(event);
            }
        }, 100);
    };

    private showPopOverHandler = (event?: any): void => {
        if (this.isActive) {
            return;
        }

        this.setPopOverPosition(event);
        angular.element(this.popOverElement).addClass('active');
        this.moveCaret();
        if (!(this.$attrs.popOverNoScroll === 'true')) {
            this.scrollToPopOver();
        }
        this.isActive = true;
    };

    private hidePopOverHandler = (event?: any): void => {
        angular.element(this.popOverElement).removeClass('active');
        this.isActive = false;
    };

    private hidePopOver = (event?: any): void => {
        this.cancelHideTimer();
        let timeout = parseInt(this.$attrs.popOverHideTimeout || 100, 10);
        this.hidePopOverTimer = setTimeout(() => {
            this.hidePopOverHandler(event);
        }, timeout);
    };

    private cancelHideTimer = (): void => {
        clearTimeout(this.hidePopOverTimer);
        this.hidePopOverTimer = undefined;
    };

    private cancelShowItmer = (): void => {
        clearTimeout(this.showPopOverTimer);
        this.showPopOverTimer = undefined;
    }

}

var tempura = angular.module('tempura.popOver', [])
    .directive('ghsPopOver', PopOver.instance);