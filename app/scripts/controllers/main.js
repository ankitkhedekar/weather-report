'use strict';

/**
 * @ngdoc function
 * @name weatherReportApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the weatherReportApp
 */
angular.module('weatherReportApp')
  .controller('MainCtrl', function ($scope, localStorageService) {

  	var tempHistory = localStorageService.get('tempHistory') || [];

  	function addTemp() {
      console.log('add');
      tempHistory.unshift($scope.now);//save the latest first in history

      if(tempHistory.length > 10){
      	removeTemp();
      }

      localStorageService.set('tempHistory', tempHistory);
    }

    function removeTemp() {
      console.log('remove');
      tempHistory.pop();//remove the oldest from history
    }	

    $scope.now = { temp: Math.floor((Math.random() * 11) + 20), timestamp: new Date().toLocaleString()}; 

	$scope.temps = JSON.parse(JSON.stringify(tempHistory));//deepcopy instead copy by reference

	addTemp();
  });