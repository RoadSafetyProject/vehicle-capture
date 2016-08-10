'use strict';

/* Filters */

var appFilters = angular.module('appFilters', [])
    .filter("extrapolateDataValue", function (iRoadModal) {
        var dataElements = [];
        iRoadModal.getDataElements().then(function (resultDataElements) {
            dataElements = resultDataElements
        })
        return function (event, dataElementName) {
            var returnValue = ""
            dataElements.forEach(function (dataElement) {
                event.dataValues.forEach(function (dataValue) {
                    if (dataValue.dataElement == dataElement.id && dataElementName == dataElement.displayName) {
                        returnValue = dataValue.value;
                    }
                })
            })
            return returnValue;
        }
    })
