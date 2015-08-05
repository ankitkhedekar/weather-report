'use strict';

/**
 * @ngdoc function
 * @name weatherReportApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the weatherReportApp
 */
angular.module('weatherReportApp')
  .controller('MainCtrl', function ($scope) {
    $scope.now = Math.floor((Math.random() * 11) + 20);
  });