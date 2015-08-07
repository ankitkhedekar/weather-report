'use strict';

/**
 * @ngdoc function
 * @name weatherReportApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the weatherReportApp
 */
angular.module('weatherReportApp')
  .controller('MainCtrl', function ($scope, localStorageService, $http) {

  	var tempHistory = localStorageService.get('tempHistory') || [];
    $scope.nowTemp = 0;

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

    function slowIncrement(val, target, delay){
      //console.log("here", $scope.nowTemp);
      $scope.nowTemp = val;
      if(val < target) {
          val++;
          delay = delay + 2;
          setTimeout(function() { 
              $scope.$apply(function(){slowIncrement(val, target, delay)});
            }
          , delay);          
      }
    }

    $http.get('http://api.worldweatheronline.com/free/v2/weather.ashx?q=Mumbai&format=json&key=7e54abfe1cd41da95e72db91b4eb7').
    then(function(response) {
      //console.log(response.data.data.current_condition[0].temp_C);
      $scope.now = { temp: response.data.data.current_condition[0].temp_C, timestamp: new Date().toLocaleString()};
      addTemp();
      slowIncrement($scope.nowTemp, $scope.now.temp, 5);
    }, function(response) {
      console.log(response);
    });

    /*For testing without API*/
    /*$scope.now = { temp: Math.floor((Math.random() * 11) + 20), timestamp: new Date().toLocaleString()};
    slowIncrement($scope.nowTemp, $scope.now.temp, 5);*/
    
    //$scope.temps = JSON.parse(JSON.stringify(tempHistory));//deepcopy instead copy by reference
    $scope.temps = angular.copy(tempHistory)

  });