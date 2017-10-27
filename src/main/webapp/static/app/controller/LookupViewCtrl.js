
(function () {
  'use strict';

  angular.module('app.pages.lookup')
      .controller('LookupViewCtrl', LookupViewCtrl);

  /** @ngInject */
  function LookupViewCtrl($scope, $filter, editableOptions, editableThemes, $uibModal, $http, notifications, TestDataGenService) {
	console.log("inside LookupViewCtrl");

	var urlBase="";
	//$http.defaults.headers.post["Content-Type"] = "application/json";

	fetchTemplateDetails();


    $scope.lookupTemplate = [];

    $scope.lookupData = [];

    /*$scope.lookupData = [
        {
          "id": 1,
          "sysFieldName": "Employee_Id",
          "dataType": "EmployeeId"
        },
        {
          "id": 2,
          "sysFieldName": "Emplyee_Name",
          "dataType": 'Name'
        },
        {
          "id": 3,
          "sysFieldName": "First_Name",
          "dataType": 'FirstName'
        },
        {
          "id": 4,
          "sysFieldName": "Last_Name",
          "dataType": "LastName"
        },
        {
          "id": 5,
          "sysFieldName": "Email_Id",
          "dataType": "Email"
        }
      ];*/

      $scope.dataTypes = [
        {value: 'Name', text: 'Name'},
        {value: 'FirstName', text: 'FirstName'},
        {value: 'LastName', text: 'LastName'},
        {value: 'Number', text: 'Number'},
        {value: 'Email', text: 'Email'},
        {value: 'Date', text: 'Date'},
        {value: 'EmployeeId', text: 'EmployeeId'},
        {value: 'EmployeeStatus', text: 'EmployeeStatus'},
        {value: 'None', text: 'None'}
      ];

      $scope.showdataType = function(lookupData) {
        var selected = [];
        if(lookupData.dataType) {
          selected = $filter('filter')($scope.dataTypes, {value: lookupData.dataType});
        }
        return selected.length ? selected[0].text : 'Not set';
      };


      $scope.removeEntry = function(index) {
        $scope.lookupData.splice(index, 1);
      };

      $scope.addEntry = function() {
        $scope.inserted = {
          id: $scope.lookupData.length+1,
          sysFieldName: '',
          dataType: null
        };
        $scope.lookupData.push($scope.inserted);
      };

      editableOptions.theme = 'bs3';
      editableThemes['bs3'].submitTpl = '<button type="submit" class="btn btn-primary btn-with-icon"><i class="ion-checkmark-round"></i></button>';
      editableThemes['bs3'].cancelTpl = '<button type="button" ng-click="$form.$cancel()" class="btn btn-default btn-with-icon"><i class="ion-close-round"></i></button>';

      $scope.openTemplateModel = function (templateId) {

    	  console.log("templateId  ::  "+templateId);

    	  fetchTemplateDetailsById(templateId);


      };

        $scope.lookupResposeBody = {
        		"templateName":$scope.templateName,
        		"lookupData":$scope.lookupData
        };



        $scope.saveTemplate = function () {
        	console.log("inside saveTemplate  ::  "+$scope.templateName);
        	if($scope.templateName != null && $scope.lookupData.length != 0) {
        		console.log("inside saveTemplate if");
        		console.log("$scope.lookupResposeBody  ::  "+$scope.templateName+"  ::  "+$scope.lookupData[0]+"  ::  $scope.templateId"+$scope.templateId);
        	$http.put('lookupdata/'+$scope.templateId,{
        		templateName:$scope.templateName,
        		lookupData:$scope.lookupData
        	}).success(function(data, status, headers) {
                console.log("data  ::  "+ data);
                notifications.showSuccess('Template Saved');
                /*$scope.templateName = null;
                $scope.lookupData = [];*/
        	});
        	} else {
        		if($scope.templateName == null) {
        			notifications.showError('Template Name is required');
        		}else{
        			notifications.showError('Minimum one row is required');
        		}
        	}
        };

        function fetchTemplateDetails() {
			console.log("inside fetchTemplateDetails");
			TestDataGenService.fetchTemplateDetails().then(
	   	            function(d) {
	   	            	angular.forEach(d, function(value, key){
	   	            		console.log("template id  ::  ",value);
	   	            		$scope.lookupTemplate.push({templateName:value.templateName,id:value.id});
	   	            		/*$scope.lookupTemplate = value;*/
	   	            		console.log("$scope.lookupTemplate  ::  "+$scope.lookupTemplate.templateName);
	   	         	});
	   	            	},function(errResponse){
	   	            		console.error('Error while fetching fetchTestCaseNames');
	           }
	   	 );
		}

        function fetchTemplateDetailsById(templateId) {
			console.log("inside fetchTemplateDetailsById");
			TestDataGenService.fetchTemplateDetailsById(templateId).then(
	   	            function(d) {
	   	            	angular.forEach(d, function(value, key){
	   	            		console.log("templateDetails  ::  ",value.lookupData);
	   	            		console.log("templateName  ::  "+value.templateName);
	   	            		console.log("templateId  ::  "+value.id);
	   	            		$scope.lookupData = value.lookupData;
	   	            		$scope.templateName = value.templateName;
	   	            		$scope.templateId = value.id;
	   	            		$uibModal.open({
	   	                     animation: true,
	   	                     templateUrl: 'static/app/pages/lookup/table/templateViewIndividual.html',
	   	                     size: 'lg',
	   	                     /*controller: 'LookupViewCtrl',*/
	   	                     scope: $scope,
	   	                   });
	   	            	});
	   	            	},function(errResponse){
	   	            		console.error('Error while fetching fetchTestCaseNames');
	           }
	   	 );
		}

  }

})();
