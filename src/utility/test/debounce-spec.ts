///<reference path="../../../typings/index.d.ts"/>
import '../debounce';

describe('<Unit Test> $$Debounce utility', () => {
    let $$debounce, $timeout;

    beforeEach( () => {
        angular.mock.module('tempura.utility.debounce');
    });

    beforeEach(inject( (_$$debounce_, _$timeout_) => {
        $$debounce = _$$debounce_;
        $timeout = _$timeout_;
    }));

    it('should not call the function multiple times within debounce time.', () => {
        let calls = 0;
        let foo = () => {
            calls++;
        };
        let debounced = $$debounce(foo, 500);
        debounced();
        debounced();
        debounced();
        debounced();
        debounced();
        debounced();
        debounced();
        debounced();
        debounced();

        expect(calls).toBe(0);
        $timeout.flush();

        expect(calls).toBe(1);

    });

});