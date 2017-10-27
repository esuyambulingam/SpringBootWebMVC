(function () {
  'use strict';

  angular.module('app').factory('lookupService', lookupService);

  function lookupService($http,$q,notifications) {


	  var REST_SERVICE_URI = '';

	  var factory = {
			  fetchRoles: fetchRoles
	    };

	    return factory;

	    function fetchRoles(appNames,fileId) {
	        var deferred = $q.defer();
	        $http.get(REST_SERVICE_URI + 'rolecolumns/'+appNames+'/'+fileId)
	            .then(
	            function (response) {
	                deferred.resolve(response.data);
	                console.log("fetchRoles response.data  ::  "+response.data);
	            },
	            function(errResponse){
	                console.error('Error while fetchRoles');
	                deferred.reject(errResponse);
	            }
	        );
	        return deferred.promise;
	    }

  };

})();
