'use strict';

/**
 * @ngdoc overview
 * @name weatherReportApp
 * @description
 * # weatherReportApp
 *
 * Main module of the application.
 */
angular
  .module('weatherReportApp', ['LocalStorageModule'])
  .config(['localStorageServiceProvider', function(localStorageServiceProvider){
	  localStorageServiceProvider.setPrefix('wr');
	}]);

