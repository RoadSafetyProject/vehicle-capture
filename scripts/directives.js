'use strict';

/* Directives */

var appDirectives = angular.module('appDirectives', [])
    .directive('elementInput', function () {

        var controller = ['$scope', 'iRoadModal', function ($scope, iRoadModal) {
            function init() {
                $scope.items = angular.copy($scope.datasource);
            }
            function getDayClass(data) {
                var date = data.date,
                    mode = data.mode;
                if (mode === 'day') {
                    var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

                    for (var i = 0; i < $scope.events.length; i++) {
                        var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

                        if (dayToCheck === currentDay) {
                            return $scope.events[i].status;
                        }
                    }
                }
            }
            // Disable weekend selection
            function disabled(data) {
                var date = data.date,
                    mode = data.mode;
                return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
            }
            init();
            $scope.data = {}
            /*iRoadModal.getDataElementByName($scope.ngDataElementName).then(function (dataElement) {
                $scope.dataElement = dataElement;
                if ($scope.dataElement.valueType == "DATE") {

                    $scope.inlineOptions = {
                        customClass: getDayClass,
                        minDate: new Date(),
                        showWeeks: true
                    };

                    $scope.dateOptions = {
                        dateDisabled: disabled,
                        formatYear: 'yy',
                        maxDate: new Date(2020, 5, 22),
                        minDate: new Date(),
                        startingDay: 1
                    };

                    $scope.toggleMin = function () {
                        $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
                        $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
                    };

                    $scope.toggleMin();

                    $scope.open1 = function () {
                        $scope.popup1.opened = true;
                    };

                    $scope.open2 = function () {
                        $scope.popup2.opened = true;
                    };

                    $scope.setDate = function (year, month, day) {
                        $scope.dt = new Date(year, month, day);
                    };

                    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
                    $scope.format = $scope.formats[0];
                    $scope.altInputFormats = ['M!/d!/yyyy'];

                    $scope.popup1 = {
                        opened: false
                    };

                    $scope.popup2 = {
                        opened: false
                    };

                    var tomorrow = new Date();
                    tomorrow.setDate(tomorrow.getDate() + 1);
                    var afterTomorrow = new Date();
                    afterTomorrow.setDate(tomorrow.getDate() + 1);
                    $scope.events = [
                        {
                            date: tomorrow,
                            status: 'full'
                        },
                        {
                            date: afterTomorrow,
                            status: 'partially'
                        }
                    ];
                }
            });*/
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
                ngProgramStageDataElement: '='
            },
            controller: controller,
            templateUrl: 'views/directives/elementInput.html'
        };
    })
