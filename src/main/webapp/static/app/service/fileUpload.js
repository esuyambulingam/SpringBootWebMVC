(function () {
  'use strict';

  angular.module('app').factory('fileUpload', fileUpload);

  function fileUpload($http,$q,notifications) {


	  var REST_SERVICE_URI = '';

	  var factory = {
			  uploadFileToUrl: uploadFileToUrl,
			  fetchFileDetails:fetchFileDetails,
			  fetchFileDetailsById:fetchFileDetailsById
	    };

	    return factory;

function uploadFileToUrl(file, uploadUrl){
	        var fd = new FormData();
	        fd.append('file', file);
	        $http.post(uploadUrl, fd, {
	            transformRequest: angular.identity,
	            headers: {'Content-Type': undefined}
	        })
	        .then(function(response){
	        	console.log("file uploaded....",response.data);
	        	if(response.data.success!=null)
	        	notifications.showSuccess(response.data.success);
	        	else if(response.data.error!=null)
	        	notifications.showError(response.data.error);
	        },function(errResponse){

	        	console.error('Error while File upload',erresponse);
	        	});
	    };

	    function fetchFileDetails() {
	        var deferred = $q.defer();
	        $http.get(REST_SERVICE_URI + 'filedetails/')
	            .then(
	            function (response) {
	                deferred.resolve(response.data);
	                console.log("fetchFileDetails response.data  ::  "+response.data);
	            },
	            function(errResponse){
	                console.error('Error while fetchFileDetails ');
	                deferred.reject(errResponse);
	            }
	        );
	        return deferred.promise;
	    }

	    function fetchFileDetailsById(fileId) {
	        var deferred = $q.defer();
	        $http.get(REST_SERVICE_URI + 'filedata/'+fileId)
	            .then(
	            function (response) {
	                deferred.resolve(response.data);
	                console.log("fetchFileDetailsById response.data  ::  "+response.data);
	            },
	            function(errResponse){

	                console.error('Error while fetchFileDetailsById ');
	                deferred.reject(errResponse);
	            }
	        );
	        return deferred.promise;
	    }
  };

})();
