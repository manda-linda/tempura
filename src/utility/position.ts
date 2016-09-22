///<reference path="../../typings/index.d.ts"/>
/**
 * This is just typescripted uib.position
 * https://github.com/angular-ui/bootstrap/blob/master/src/position/position.js 
 */
export interface IBounds {
    width: number;
    height: number;
    top: number;
    left: number;
} 

export class TempuraPosition {
    public static $inject: Array<string> = ['$document', '$window'];

    constructor(private $document, private $window){
    }

    public getRawNode (elem: HTMLScriptElement): HTMLScriptElement {
        return elem.nodeName ? elem : elem[0] || elem;
    }

    public offset (elem: HTMLScriptElement): IBounds {
          elem = this.getRawNode(elem);
          let elemBCR = elem.getBoundingClientRect();
          return {
            width: Math.round(angular.isNumber(elemBCR.width) ? elemBCR.width : elem.offsetWidth),
            height: Math.round(angular.isNumber(elemBCR.height) ? elemBCR.height : elem.offsetHeight),
            top: Math.round(elemBCR.top + (this.$window.pageYOffset || this.$document[0].documentElement.scrollTop)),
            left: Math.round(elemBCR.left + (this.$window.pageXOffset || this.$document[0].documentElement.scrollLeft))
          };
    }

    public offsetParent (elem: any): HTMLScriptElement {
          elem = this.getRawNode(elem);
          let offsetParent = elem.offsetParent || this.$document[0].documentElement;
          let isStaticPositioned = (el: JQuery): boolean => {
            return (this.$window.getComputedStyle(el).position || 'static') === 'static';
          }

          while (offsetParent && offsetParent !== this.$document[0].documentElement && isStaticPositioned(offsetParent)) {
            offsetParent = offsetParent.offsetParent;
          }

          return offsetParent || this.$document[0].documentElement;        
    }

    public position (elem: HTMLScriptElement): IBounds {
          elem = this.getRawNode(elem);

          let elemOffset = this.offset(elem);

          return {
            width: Math.round(angular.isNumber(elemOffset.width) ? elemOffset.width : elem.offsetWidth),
            height: Math.round(angular.isNumber(elemOffset.height) ? elemOffset.height : elem.offsetHeight),
            top: Math.round(elemOffset.top),
            left: Math.round(elemOffset.left)
          };
    }

    public positionRelative (elem: HTMLScriptElement): IBounds {
          elem = this.getRawNode(elem);

          let elemOffset = this.offset(elem);
          let parent = this.offsetParent(elem);
          let parentOffset = {top: 0, left: 0};

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
    }

    public eventPosition (event?: any): IBounds {
        let bodyBounds: any = this.offset(this.$document[0].body),
            target = event.target,
            _top = event.clientY,
            _left = event.clientX,
            _width = 0,
            _height = 0;

            // no mouse position, use target elem position
            if((!_top || !_left) && target) {
                let targetPos = this.position(target);
                _top = targetPos.top;
                _left = targetPos.left;
                _width = targetPos.width;
                _height = targetPos.height;
            } else {
              _top =  Math.round(_top + (this.$window.pageYOffset || this.$document[0].documentElement.scrollTop));
              _left =  Math.round(_left + (this.$window.pageXOffset || this.$document[0].documentElement.scrollLeft));
            }
        return {
          width: _width,
          height: _height,
          top:  _top,
          left:  _left
        }
    }
}


angular.module('tempura.utility.position', [])
.service('tempuraPosition', TempuraPosition);