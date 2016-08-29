import typeahead1 from 'typeahead1.tpl.html!text';
import popover1 from 'popover1.tpl.html!text';
import popover2 from 'popover2.tpl.html!text';
import popover3 from 'popover3.tpl.html!text';

import prism from 'node_modules/prismjs/prism';

angular.module('examples', [])

.controller("exampleController",['$scope', '$sce', function($scope, $sce){
    $scope.exampleModel = {
        value: ""
    };
    $scope.typeahead1 = $sce.trustAsHtml(prism.highlight(typeahead1, Prism.languages.markup));
    $scope.popover1 = $sce.trustAsHtml(prism.highlight(popover1, Prism.languages.markup));
    $scope.popover2 = $sce.trustAsHtml(prism.highlight(popover2, Prism.languages.markup));
    $scope.popover3 = $sce.trustAsHtml(prism.highlight(popover3, Prism.languages.markup));
   
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
    }

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