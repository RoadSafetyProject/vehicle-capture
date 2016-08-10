/* global angular */

'use strict';

/* Controllers */
var appControllers = angular.module('appControllers', ['iroad-relation-modal'])

    .controller('MainController', function (NgTableParams,iRoadModal, $scope,$uibModal,$log) {
        //$scope.offenceEvent = iRoadModal("Offence Event");
        $scope.loading = true;
        $scope.tableParams = new NgTableParams();
        $scope.params ={pageSize:5};
        $scope.programName = "Offence Event";
        function createColumns(programStageDataElements) {
            var cols = []
            if (programStageDataElements){
                programStageDataElements.forEach(function (programStageDataElement) {
                    var filter = {};
                    filter[programStageDataElement.dataElement.name.replace(" ","")] = 'text';
                    cols.push({
                        field: programStageDataElement.dataElement.name.replace(" ",""),
                        title: programStageDataElement.dataElement.name,
                        headerTitle: programStageDataElement.dataElement.name,
                        show: programStageDataElement.displayInReports,
                        sortable: programStageDataElement.dataElement.name.replace(" ",""),
                        filter: filter
                    });
                })
            }
            cols.push({
                field: "",
                title: "Action",
                headerTitle: "Action",
                show: true
            });
            return cols;
        }
        $scope.getOffences = function(){
            iRoadModal.getAll($scope.programName,$scope.params).then(function(results){
                $scope.tableParams.settings({
                    dataset: results
                });
                $scope.loading = false;
                iRoadModal.getProgramByName($scope.programName).then(function(program){
                    $scope.program = program;
                    $scope.tableCols = createColumns(program.programStages[0].programStageDataElements);

                })
            })
        }

        $scope.getOffences();
        $scope.showDetails = function(event){
            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'views/details.html',
                controller: 'DetailController',
                size: "sm",
                resolve: {
                    event: function () {
                        return event;
                    },
                    program:function(){
                        return $scope.program;
                    }
                }
            });

            modalInstance.result.then(function (resultItem) {

            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }
        $scope.showEdit = function(item){
            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'views/addedit.html',
                controller: 'EditController',
                size: "lg",
                resolve: {
                    event: function () {
                        return event;
                    },
                    program:function(){
                        return $scope.program;
                    }
                }
            });

            modalInstance.result.then(function (resultItem) {
                for(var key in item){
                    item[key] = resultItem[key];
                }
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }
        $scope.showAddNew = function(){
            var item = {};
            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'views/addedit.html',
                controller: 'EditController',
                size: "lg",
                resolve: {
                    item: function () {
                        return item;
                    },
                    ProgramName:function(){
                        return $scope.programName;
                    }
                }
            });

            modalInstance.result.then(function (resultItem) {
                for(var key in item){
                    item[key] = resultItem[key];
                }
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }
    })
    .controller('DetailController', function (NgTableParams,iRoadModal, $scope,$uibModalInstance,program,event) {
        $scope.loading = true;
        $scope.event = event;
        $scope.program = program;
        console.log(program.programStages[0].programStageDataElements);
        $scope.ok = function () {
            $uibModalInstance.close({});
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    })
    .controller('EditController', function (NgTableParams,iRoadModal, $scope,$uibModalInstance,program,event,toaster) {
        $scope.event = event;
        $scope.program = program;
        $scope.save = function () {
            $scope.loading = true;
            iRoadModal.save("Offence Event",$scope.item).then(function(results){
                console.log(results);
                $scope.loading = false;
                toaster.pop('success', result.response.status, result.message);
                $uibModalInstance.close($scope.item);
            },function(error){
                $scope.loading = false;
                console.log(error);
                toaster.pop('error', error.status, error.statusText);
            });
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    })
