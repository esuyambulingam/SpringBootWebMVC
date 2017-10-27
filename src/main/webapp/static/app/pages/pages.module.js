(function () {
  'use strict';

  angular.module('app.pages', [
    'ui.router',
    'app.pages.lookup',
    'ui.select',
    'ngSanitize'
  ]).config(routeConfig);

  /** @ngInject */
  function routeConfig($urlRouterProvider, $httpProvider) {
	  	
	  	$urlRouterProvider.when('', '/landing');
	    //$urlRouterProvider.otherwise('lookupview');
  }

})();
