import '../src/app';
import './example';

 (function() {
    angular.element(document).ready(function () {
        angular.bootstrap(document, ['tempura', 'examples']);
    });    
 })();