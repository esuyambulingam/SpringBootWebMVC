
(function () {
  'use strict';

  angular.module('app')
      .factory('TestDataGenService', TestDataGenService);

  /** @ngInject */
  function TestDataGenService($http, $q ) {

	  var REST_SERVICE_URI = '';

	  var factory = {
			  fetchTestCaseNames: fetchTestCaseNames,
			  fetchTestCaseById:fetchTestCaseById,
			  insertTestCaseDetails: insertTestCaseDetails,
			  insertTestData:insertTestData,
			  fetchTemplateDetails:fetchTemplateDetails,
			  fetchTemplateDetailsbyType:fetchTemplateDetailsbyType,
			  updateTestCaseDetails:updateTestCaseDetails,
			  fetchRehireData:fetchRehireData,
			  updateTestData:updateTestData,
			  fetchTemplateDetailsById:fetchTemplateDetailsById,
			  validateTestCaseName:validateTestCaseName,
			  downLoadSql:downLoadSql,
			  downLoadCsv:downLoadCsv
	    };

	    return factory;

	  function fetchTestCaseNames() {
	        var deferred = $q.defer();
	        $http.get(REST_SERVICE_URI + 'fetchtestcaseNames/')
	            .then(
	            function (response) {
	                deferred.resolve(response.data);
	                console.log("response.data  ::  ",response.data);
	            },
	            function(errResponse){
	                console.error('Error while fetchtestcaseNames ');
	                deferred.reject(errResponse);
	            }
	        );
	        return deferred.promise;
	    }

	  function fetchTestCaseById(testCaseId) {
	        var deferred = $q.defer();
	        $http.get(REST_SERVICE_URI + 'fetchTestCaseById/'+testCaseId)
	            .then(
	            function (response) {
	                deferred.resolve(response.data);
	                console.log("fetchTestCaseById response.data  ::  "+response.data);
	            },
	            function(errResponse){
	                console.error('Error while fetchTestCaseById in servcie ');
	                deferred.reject(errResponse);
	            }
	        );
	        return deferred.promise;
	    }

	  function insertTestCaseDetails(testDetails) {

	        var deferred = $q.defer();
	        $http.post(REST_SERVICE_URI + 'testcasedetails/', testDetails)
	            .then(
	            function (response) {
	                deferred.resolve(response.data);
	                console.log("insertTestDetails response.data  ::  "+response.data);
	            },
	            function(errResponse){
	                console.error('Error while insertTestDetails ');
	                deferred.reject(errResponse);
	            }
	        );
	        return deferred.promise;
	    }





	  function insertTestData(testCaseId,url){
		  console.log("inside insertTestData service testCaseId  ::  "+testCaseId);
		  var deferred = $q.defer();
	        $http.get(REST_SERVICE_URI +url+testCaseId)
	            .then(
	            function (response) {
	                deferred.resolve(response.data);
	                console.log("insertTestData response.data  ::  ",response);
	            },
	            function(errResponse){
	                console.error('Error while insertTestData');
	                deferred.reject(errResponse);
	            }
	        );
	        return deferred.promise;

	  }

	  function fetchTemplateDetails() {
	        var deferred = $q.defer();
	        $http.get(REST_SERVICE_URI + 'lookupdata/')
	            .then(
	            function (response) {
	                deferred.resolve(response.data);
	                console.log("fetchTemplateDetails response.data  ::  ");
	            },
	            function(errResponse){
	                console.error('Error while fetchTemplateDetails ');
	                deferred.reject(errResponse);
	            }
	        );
	        return deferred.promise;
	    }

	  function fetchTemplateDetailsById(templateId) {
	        var deferred = $q.defer();
	        $http.post(REST_SERVICE_URI + 'templatedata/', templateId)
	            .then(
	            function (response) {
	                deferred.resolve(response.data);
	                console.log("fetchTemplateDetailsById response.data  ::  "+response.data);
	            },
	            function(errResponse){
	                console.error('Error while fetchTemplateDetailsById ');
	                deferred.reject(errResponse);
	            }
	        );
	        return deferred.promise;
	    }

	  function fetchTemplateDetailsbyType(templateType) {
	        var deferred = $q.defer();
	        $http.post(REST_SERVICE_URI + 'templatebytype/',templateType)
	            .then(
	            function (response) {
	                deferred.resolve(response.data);
	                console.log("fetchTemplateDetailsbyType response.data  ::  "+response.data);
	            },
	            function(errResponse){
	                console.error('Error while fetchTemplateDetailsbyType ');
	                deferred.reject(errResponse);
	            }
	        );
	        return deferred.promise;
	    }
	  
	  function updateTestCaseDetails(testDetails,tetsCaseId) {

	        var deferred = $q.defer();
	        $http.put(REST_SERVICE_URI + 'updatetestcasedetails/'+tetsCaseId, testDetails)
	            .then(
	            function (response) {
	                deferred.resolve(response.data);
	                console.log("updatetestcasedetails response.data  ::  "+response.data);
	            },
	            function(errResponse){
	                console.error('Error while updatetestcasedetails ');
	                deferred.reject(errResponse);
	            }
	        );
	        return deferred.promise;
	    }

	  function fetchRehireData(testCaseId,url) {
	        var deferred = $q.defer();
	        $http.get(REST_SERVICE_URI + url+testCaseId)
	            .then(
	            function (response) {
	                deferred.resolve(response.data);
	                console.log("fetchRehireData response.data  ::  "+response.data);
	            },
	            function(errResponse){
	                console.error('Error while fetchRehireData ');
	                deferred.reject(errResponse);
	            }
	        );
	        return deferred.promise;
	    }

	  function updateTestData(dataDetails,testGenId) {

	        var deferred = $q.defer();
	        $http.put(REST_SERVICE_URI + 'updatetestdata/'+testGenId, dataDetails)
	            .then(
	            function (response) {
	                deferred.resolve(response.data);
	                console.log("insertTestDetails response.data  ::  "+response.data);
	            },
	            function(errResponse){
	                console.error('Error while updateTestData');
	                deferred.reject(errResponse);
	            }
	        );
	        return deferred.promise;
	    }
	  function validateTestCaseName(testCaseName){
		  var deferred = $q.defer();
	        $http.get(REST_SERVICE_URI + 'validatetestcasename/'+testCaseName)
	            .then(
	            function (response) {
	                deferred.resolve(response.data);
	                console.log("validatetestCaseName response.data  ::  "+response.data);
	            },
	            function(errResponse){
	                console.error('Error in testdata gen service validatetestCaseName');
	                deferred.reject(errResponse);
	            }
	        );
	        return deferred.promise;
	  }
	  function downLoadSql(testCaseId,sqlFileName){
		  var deferred = $q.defer();
	        $http.get(REST_SERVICE_URI + 'downloadsql/'+testCaseId+'/'+sqlFileName)
	            .then(
	            function (response) {
	                deferred.resolve(response);
	                console.log("downLoadSql response.data  ::  ",response);
	            },
	            function(errResponse){
	                console.error('Error in downLoadSql gen service');
	                deferred.reject(errResponse);
	            }
	        );
	        return deferred.promise;
	  }

	  function downLoadCsv(testCaseId,csvFileName){
		  var deferred = $q.defer();
	        $http.get(REST_SERVICE_URI + 'downloadcsv/'+testCaseId+'/'+csvFileName)
	            .then(
	            function (response) {
	                deferred.resolve(response);
	                console.log("downLoadCsv response.data  ::  ",response);
	            },
	            function(errResponse){
	                console.error('Error in downLoadCsv gen service');
	                deferred.reject(errResponse);
	            }
	        );
	        return deferred.promise;
	  }


  }

  })();
