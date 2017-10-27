(function () {
  'use strict';

  angular.module('app.pages.lookup', ['ngNotificationsBar', 'ngSanitize'])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, notificationsConfigProvider) {

		  	notificationsConfigProvider.setHideDelay(3000);
		  	notificationsConfigProvider.setAutoHide(true);
		  	notificationsConfigProvider.setAcceptHTML(true);

    
    $stateProvider
    .state('landing', {
      url: '/landing',
      templateUrl: 'static/app/pages/lookup/dashboardview.html',
      controller: 'dashboardCtrl',
    });

  }

})();
