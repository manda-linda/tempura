angular.module('examples', [])

.controller("exampleController",["$scope", function($scope){
    var alpha = 'abcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $scope.exampleModel;

    $scope.callBack = function($viewValue) {
        var results = [];
        console.log("NEW VIEW VALUE: "+ $viewValue);
        for( var i = 0 ; i < $viewValue; i++) {
            results.push({value: alpha.charAt(i%alpha.length)});
        }
        return results;
    }
    $scope.click = function() {
        $scope.exampleModel++;
    }

    $scope.$watch('exampleModel', function(value){
        console.log("NEW MODEL VALUE: " + value);
    })

}]);