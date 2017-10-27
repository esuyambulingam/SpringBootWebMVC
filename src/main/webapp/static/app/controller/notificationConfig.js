(function () {
  'use strict';

  angular.module('app', ['ngNotificationsBar', 'ngSanitize']).
  app.config(['notificationsConfigProvider', function(notificationsConfigProvider){
  	notificationsConfigProvider.setHideDelay(3000);
  	notificationsConfigProvider.setAutoHide(true);
  	notificationsConfigProvider.setAcceptHTML(true);
  }]);
})();
