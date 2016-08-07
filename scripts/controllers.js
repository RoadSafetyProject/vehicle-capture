/* global angular */

'use strict';

/* Controllers */
var appControllers = angular.module('appControllers', ['iroad-relation-modal'])

    .controller('MainController', function (NgTableParams,iRoadModal, $scope,$uibModal,$log) {
        //$scope.offenceEvent = iRoadModal("Offence Event");
        $scope.loading = true;
        $scope.tableParams = new NgTableParams();
        $scope.params ={pageSize:5};

        $scope.getOffences = function(){
            iRoadModal.getAll("Offence Event",$scope.params).then(function(results){
                console.log(results);
                $scope.tableParams.settings({
                    dataset: results
                });
                $scope.loading = false;
            })
        }
        $scope.getOffences();
        $scope.showDetails = function(item){
            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'views/details.html',
                controller: 'DetailController',
                size: "sm",
                resolve: {
                    item: function () {
                        return item;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }
        $scope.showEdit = function(item){
            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'views/addedit.html',
                controller: 'EditController',
                size: "sm",
                resolve: {
                    item: function () {
                        return item;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }
    })
    .controller('DetailController', function (NgTableParams,iRoadModal, $scope,$uibModalInstance,item) {
        $scope.loading = true;
        $scope.item = item;

        $scope.ok = function () {
            $uibModalInstance.close($scope.item);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    })
    .controller('EditController', function (NgTableParams,iRoadModal, $scope,$uibModalInstance,item) {
        $scope.loading = true;
        $scope.item = item;

        $scope.ok = function () {
            $uibModalInstance.close($scope.item);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    })
