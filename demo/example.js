import typeahead1 from './typeahead1.tpl.html!text';
import typeahead2 from './typeahead2.tpl.html!text';
import typeaheadMatchReload from './typeaheadMatchReload.tpl.html!text';

import popover1 from './popover1.tpl.html!text';
import popover2 from './popover2.tpl.html!text';
import popover3 from './popover3.tpl.html!text';

import prism from '../node_modules/prismjs/prism';

angular.module('examples', [])

.controller("exampleController",['$scope', '$sce', '$templateCache', function($scope, $sce, $templateCache){
    var templates = {
        'typeahead1': typeahead1,
        'typeahead2': typeahead2,
        'typeaheadMatchReload': typeaheadMatchReload,
        'popover1': popover1,
        'popover2': popover2,
        'popover3': popover3
    };

    for(var key in templates) {
        $scope[key]= $sce.trustAsHtml(prism.highlight(templates[key], prism.languages.markup));
        $templateCache.put(key+'.tpl.html' , templates[key]);
    }

    $scope.exampleModel = {
        value: ""
    };

    $scope.callBack = function($viewValue) {
        var results = [];
        for( var i = 0 ; i < food.dishes.length; i++) {
            if(food.dishes[i].toLowerCase().indexOf($viewValue.toLowerCase()) > -1){
                results.push({value: food.dishes[i]});
            }
        }
        return results;
    }

    var maxLength = 3;
    function matchFunction($event, reload){
        $event.stopPropagation();
        maxLength ++;
        reload({value: $scope.exampleModel.value});
    }

    $scope.callBack2 = function($viewValue) {
        var results = [];
        for( var i = 0 ; i < food.dishes.length; i++) {
            if(food.dishes[i].toLowerCase().indexOf($viewValue.toLowerCase()) > -1 && results.length < maxLength){
                results.push({value: food.dishes[i]});
            } else if (results.length === maxLength) {
                results.push({ngDisabled: true, matchFunction: matchFunction, value: "Load More"});
            }

        }
        return results;
    }

    $scope.click = function() {
        var random = Math.floor(Math.random() * food.dishes.length);
        $scope.exampleModel.value = food.dishes[random];
    }

    $scope.typeahead1Code = $sce.trustAsHtml(prism.highlight(`       
        $scope.exampleModel = {
            value: ""
        };
        
        $scope.callBack = function($viewValue) {
            var results = [];
            for( var i = 0 ; i < food.dishes.length; i++) {
                if(food.dishes[i].toLowerCase().indexOf($viewValue.toLowerCase()) > -1){
                    results.push({value: food.dishes[i]});
                }
            }
            return results;
        }
        $scope.click = function() {
            var random = Math.floor(Math.random() * food.dishes.length);
            $scope.exampleModel.value = food.dishes[random];
        };
    `, prism.languages.javascript);

    $scope.typeahead2Code = $sce.trustAsHtml(prism.highlight(`       
        var maxLength = 3;
        function matchFunction($event, reload){
            $event.stopPropagation();
            maxLength ++;
            reload({value: $scope.exampleModel.value});
        }

        $scope.callBack2 = function($viewValue) {
            var results = [];
            for( var i = 0 ; i < food.dishes.length; i++) {
                if(food.dishes[i].toLowerCase().indexOf($viewValue.toLowerCase()) > -1 && results.length < maxLength){
                    results.push({value: food.dishes[i]});
                } else if (results.length === maxLength) {
                    results.push({ngDisabled: true, matchFunction: matchFunction, value: "Load More"});
                }

            }
            return results;
        }
    `, prism.languages.javascript);

var food = {
    "dishes":[
        "Gindara saikyo-yaki",
        "Horsemeat",
        "Warabi mochi",
        "Umi-budo",
        "sushi",
        "Chirashi-don",
        "Tonkatsu",
        "Wagyu",
        "Tempura",
        "Ramen",
        "Satsuma-age",
        "Te-uchi soba",
        "Sanuki udon",
        "Japanese curry rice",
        "Yaki-imo",
        "Taimeshi",
        "Takoyaki",
        "Kabayaki",
        "Ochazuke",
        "Onigiri",
        "Tofu",
        "Natto",
        "Okonomiyaki/monjayaki",
        "Nabe",
        "miso",
        "mochi",
        "Namero",
        "Gyoza",
        "Taco rice",
        "Naporitan spaghetti",
        "Yakitori",
        "Oden",
        "Rare cheesecake",
        "Dojo (loach)",
        "Tamago-yaki/dashimaki tamago",
        "Taiyaki",
        "Sekihan",
        "Tsukemono",
        "Karaage",
        "Matcha Latte"
        ]
};
    $scope.click();
}]);