import '../src/app';
import './example';
import  '/node_modules/angular-ui-bootstrap/dist/ui-bootstrap.js';
import  '/node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js';



 (function() {
    angular.element(document).ready(function () {
        angular.bootstrap(document, ['tempura', 'examples', 'ui.bootstrap']);
    });    
 })();