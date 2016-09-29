///<reference path="../../../typings/index.d.ts"/>
import '../pop-over-directive';

describe('<Unit Test> Pop Over Component', () => {
    let $rootScope,
        $compile,
        $window,
        $document,
        element,
        ctrl;


    beforeEach( () => {
        jasmine.clock().install();
        angular.mock.module('tempura.popOver');    
    });

    beforeEach(inject((_$rootScope_,
                       _$compile_,
                       _$window_,
                       _$document_) => {

        $rootScope = _$rootScope_;
        $compile = _$compile_;
        $window = _$window_;
        $document = _$document_;
        $window = _$window_;

    }));

    afterEach(() => {
        jasmine.clock().uninstall();
    });


    let getController = (html) => {
        element = $compile(html)($rootScope);
        let controller = element.controller('ghsPopOver');
        $rootScope.$digest();
        return controller;
    };

    describe('$link', () => {
        it('should compile', () => {
            ctrl = getController('<input ghs-pop-over pop-over-content="foo popover content">');
            expect(ctrl).toBeDefined();
        });

        it('should not be initialzed if disabled is true', () => {

            let html = '<input ghs-pop-over ' +
                'pop-over-content="foo popover content" ' +
                'pop-over-disabled="true">';

            ctrl = getController(html);
            expect(ctrl.isInitialized).toBeFalsy();
        });

        it ('should create a DOM element and add it to the document body', () => {

            let html = '<input ghs-pop-over ' +
                'pop-over-content="foo popover content" ' +
                'pop-over-disabled="false">';

            ctrl = getController(html);
            expect(ctrl.isInitialized).toBeTruthy();

            let popOver = $document[0].body.querySelectorAll('aside.popOver-content')[0];
            expect(popOver).toBeDefined();
            expect(/foo popover content/.test(popOver.innerHTML)).toBeTruthy();
        });

        it('should take the contents of the specified DOM element and use it in the popover', () => {

            // add popover content to document
            $document[0].body.appendChild(angular.element('<div id="popOverSample">this is a foo</div>')[0]);

            let html = '<input ghs-pop-over ' +
                'pop-over-content-src="#popOverSample"' +
                'pop-over-disabled="false">';

            ctrl = getController(html);

            let popOver = $document[0].body.querySelectorAll('aside.popOver-content')[0];
            expect(popOver).toBeDefined();
            expect(/this is a foo/.test(popOver.innerHTML)).toBeTruthy();

        });

        it ('should add a class and max width style to the popover if specified', () => {

            let html = '<input ghs-pop-over ' +
                'pop-over-max-width="300"' +
                'pop-over-css-class="fooClass"' +
                'pop-over-content="foo popover content" ' +
                'pop-over-disabled="false">';

            ctrl = getController(html);
            expect(ctrl.isInitialized).toBeTruthy();
            let popOver = $document[0].body.querySelectorAll('aside.popOver-content')[0];

            expect(/fooClass/.test(popOver.className)).toBeTruthy();
            expect(popOver.style.maxWidth).toBe('300px');

        });

        it('should specify the dom events to handle', () => {

            let html = '<input ghs-pop-over ' +
                'pop-over-triggers="mouseover, focus"' +
                'pop-over-closers="mouseout, blur"' +
                'pop-over-content="foo popover content" ' +
                'pop-over-disabled="false">';

            ctrl = getController(html);

            expect(ctrl.triggers).toEqual(['mouseover', 'focus']);
            expect(ctrl.closers).toEqual([ 'blur', 'mouseout']);
        });

        it('should default focus and blur if element is an input', () => {

            // inputs & buttons
            let html = '<input ghs-pop-over ' +
                'pop-over-content="foo popover content" ' +
                'pop-over-disabled="false">';

            ctrl = getController(html);

            expect(ctrl.triggers).toEqual(['focus']);
            expect(ctrl.closers).toEqual(['blur']);


            // inputs & buttons
            html = '<button ghs-pop-over ' +
                'pop-over-content="foo popover content" ' +
                'pop-over-disabled="false">';

            ctrl = getController(html);

            expect(ctrl.triggers).toEqual(['focus']);
            expect(ctrl.closers).toEqual(['blur']);

        });

        it('should default to mouseout,blur and mouse over for all other elements', () => {

            // inputs & buttons
            let html = '<span ghs-pop-over ' +
                'pop-over-content="foo popover content" ' +
                'pop-over-disabled="false">';

            ctrl = getController(html);

            expect(ctrl.triggers).toEqual(['mouseover', 'touchstart']);
            expect(ctrl.closers).toEqual(['mouseout', 'touchleave']);

        });


    });


});
