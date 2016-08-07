'use strict';

/* Directives */

var appDirectives = angular.module('appDirectives', [])
    .directive('elementInput', function () {

        var controller = ['$scope','iRoadModal',function ($scope,iRoadModal) {
            function init() {
                $scope.items = angular.copy($scope.datasource);
            }

            init();
            $scope.data = {

            }
            iRoadModal.getDataElementByName($scope.ngDataElementName).then(function(dataElement){
                $scope.dataElement = dataElement;
            });
            /*$scope.functions = null;
            $scope.response = {status:"",message:"Does Not Exist"};
            angular.forEach($scope.dataElement.attributeValues,function(attributeValue){

                if(attributeValue.attribute.name == "Function"){
                    $scope.functions = eval("(" + attributeValue.value+ ')');
                }
            })
            $scope.envoke = function(functionName){
                $scope.functions[functionName]($scope.ngModel,$scope.response);
            }
            $scope.onBlur = function(){
                if($scope.functions.events.onBlur){
                    $scope.functions[$scope.functions.events.onBlur]($scope.ngModel,$scope.response);
                }
            }
            $scope.functions.init();
            $scope.dataName = "";
            $scope.dataTitle = "";
            $scope.showModal = function(dataName){
                $('#dataInputModal').modal('show');
                $scope.dataName = dataName.toLowerCase();
                $scope.dataTitle = dataName;
            }*/
        }];
        return {
            restrict: 'AEC',
            require: '^form',
            scope: {
                //actions:actions,
                ngModel: '=',
                crudOperation: '=',
                ngDataElementName:'='
            },
            controller: controller,
            templateUrl: 'views/directives/elementInput.html'
        };
    })
