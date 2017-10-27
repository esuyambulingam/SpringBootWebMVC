
	(function () {
	  'use strict';

	  angular.module('app.pages.lookup')
	      .controller('TestDataGenCtrl', TestDataGenCtrl);

	  /** @ngInject */
	  function TestDataGenCtrl($scope, $http, TestDataGenService, $q, $timeout, editableOptions, editableThemes, notifications, $window) {
		console.log("inside TestDataGenCtrl");

		$scope.showText = false;
		$scope.showEnv = false;
		$scope.lookupData = [];

		fetchTestCaseNames();
		fetchTemplateDetails();
		$scope.lookupData = [];
		$scope.testDataAccess = null;

		$scope.withModuleItem = {};

		$scope.selectModuleItems = [
		    { label: 'Life Cycle Events', value: 1 },
	        { label: 'Access Request', value: 2 },
	      //  { label: 'Entitlement Value Owner', value: 3 },
	    //    { label: 'Certification', value: 4 },
	    //    { label: 'Task Creation/Execution', value: 5 },
	        { label: 'Generic Type', value: 3 }
	      ];

		$scope.withOperationItem = {};

	/*	$scope.selectOperationItems = [
	        { label: 'Joiner', value: 1 },
	        { label: 'Leaver', value: 2 },
	        { label: 'Rehire', value: 3 },
	        { label: 'Mover', value: 4 },
	      ];*/

		$scope.withTestItem = {};

		$scope.selectTestItems = [
	        /*{ label: 'TestOme', value: 1 },
	        { label: 'TestTow', value: 2 },
	        { label: 'TestThree', value: 3 },
	        { label: 'TestFour', value: 4 },
	        { label: 'TestFive', value: 4 },*/
	      ];

		$scope.getTestItems = function(search) {
		     var testItem = $scope.selectTestItems.slice();
		      if (search && testItem.indexOf(search) === -1) {
		    	  testItem.unshift(search);
		      }
		      return testItem;
		    }

		$scope.getMatches = function(searchText) {
	        var deferred = $q.defer();

	        $timeout(function() {
	            var states = $scope.selectTestItems.filter(function(testItem) {
	                return (testItem.label.toUpperCase().indexOf(searchText.toUpperCase()) !== -1);
	            });
	            deferred.resolve(states);
	        }, 1500);

	        return deferred.promise;
	    }

		$scope.withEnvironmentItem = {};

		$scope.withEnvironmentItem.selected = {label: 'Select Environment'};

		$scope.selectEnvironmentItems = [
	        { label: 'DEV', value: 1 },
	        { label: 'QA', value: 2 },
	        { label: 'UAT', value: 3 }
	      ];

		$scope.withTemplateItem = {};

		$scope.withTemplateItem.selected = {label: 'Select Template Name'};

		$scope.selectTemplateItems = [
	        /*{ label: 'TemplateOne', value: 1 },
	        { label: 'TemplateTwo', value: 2 }*/
	      ];

		$scope.onSelectOperation = function(operation) {
			console.log("inside onSelectOperation  ::  "+operation.label);
			//fetchTestCaseNames();
			if(operation.label == 'Joiner') {
				$scope.showText = true;
			}else if(operation.label == 'New') {
				$scope.showText = true;
			}
			else{
				$scope.showText = false;
			}
		};

		$scope.onSelectModule = function(module) {
			console.log("inside onSelectModule ::  "+module.label);
			//fetchTestCaseNames();
			var templateType = module.value;
			console.log("module.value :: "+templateType);
		//	fetchTemplateDetailsbyType(templateType);
			$scope.withOperationItem = {};
			if(module.label== 'Life Cycle Events') {
				$scope.showText = true;
				$scope.showEnv = false;
				$scope.selectOperationItems = [
				                   	        { label: 'Joiner', value: 1 },
				                   	        { label: 'Leaver', value: 2 },
				                   	        { label: 'Rehire', value: 3 },
				                   	        { label: 'Mover', value: 4 }
				                   	      ];
			}
			/*else if(module.label== 'Access Request') {
				{
				$scope.showText = false;
				}*/
			else 	if(module.label== 'Access Request'){
				$scope.showText = true;
				$scope.showEnv = false;
				$scope.selectOperationItems = [
					                   	        { label: 'New', value: 1 },
					                   	        { label: 'Update', value: 2 },
					                   	      ];
			}
			else if(module.label== 'Generic Type'){
				$scope.showText = true;
				$scope.showEnv = true;
				$scope.selectOperationItems = [
					                   	        { label: 'New', value: 1 },
					                   	        { label: 'Update', value: 2 },
					                   	      ];
			}else{
				$scope.showText = false;
				$scope.showEnv = false;
			}
		};


		function fetchTestCaseNames() {
			//console.log("inside fetchTestCaseNames");
			TestDataGenService.fetchTestCaseNames().then(
	   	            function(d) {
	   	            	angular.forEach(d, function(value,key){
	   	         		//console.log("testCaseNames  ::  "+value.testcaseID);
	   	         		//console.log("templateid  ::  "+value.templateid.id);
	   	         		$scope.selectTestItems.push({label:value.testcaseName,value:value.testcaseID});
	   	         		//$scope.selectTemplateItems.push({label:value.templateid.templateName,value:value.templateid.id});
	   	         	});
	   	            	},function(errResponse){
	   	            		console.error('Error while fetching fetchTestCaseNames');
	           }
	   	 );
		}

		function fetchTemplateDetails() {
			//console.log("inside fetchTemplateDetails");
			TestDataGenService.fetchTemplateDetails().then(
	   	            function(d) {
	   	            	angular.forEach(d, function(value,key){
	   	            		//console.log("template id  ::  "+value.id);
	   	         		$scope.selectTemplateItems.push({label:value.templateName,value:value.id,type:value.templateType});
	   	         	});
	   	            	},function(errResponse){
	   	            		console.error('Error while fetching fetchTestCaseNames');
	           }
	   	 );
		}
		function fetchTemplateDetailsbyType(templateType){
			console.log("inside fetchTemplateDetailsbyType :: "+templateType);
			TestDataGenService.fetchTemplateDetailsbyType(templateType).then(
	   	            function(d) {
	   	            	angular.forEach(d, function(value,key){
	   	            		//console.log("template id  ::  "+value.id);
	   	         		$scope.selectTemplateItems.push({label:value.templateName,value:value.id});
	   	         	});
	   	            	},function(errResponse){
	   	            		console.error('Error while fetching fetchTestCaseNames');
	           }
	   	 );
		}

		$scope.generateTestData = function() {
			console.log("Module  ::  "+$scope.withModuleItem.selected.label);
			console.log("Operation  ::  "+$scope.withOperationItem.selected.label);
			//console.log("Test Case Name  ::  "+$scope.withTestItem.selected.label);
			console.log("Environment  ::  "+$scope.withEnvironmentItem.selected.label);
			console.log("Template Name  ::  "+$scope.withTemplateItem.selected.value);
			console.log("No Of Rows  ::  "+$scope.noOfRows);
			console.log("$scope.testCaseName  ::  "+$scope.testCaseName);
			//console.log("$scope.searchText  ::  "+$scope.searchText);

			var operationType = $scope.withOperationItem.selected.label;
			var moduleType = $scope.withModuleItem.selected.label;
		//	if(moduleType == "Life Cycle Events"){
			if(operationType == "Joiner" ||operationType == "New") {
				console.log("inside  ::  "+operationType);
				$scope.csvFileName = $scope.testCaseName;
			//	$scope.SqlFileName = $scope.testCaseName;
				$scope.testDetails={
						testcaseName:$scope.testCaseName,
						module:$scope.withModuleItem.selected.label,
						operation:$scope.withOperationItem.selected.label,
						env:$scope.withEnvironmentItem.selected.label,
						noofRows:$scope.noOfRows,
						templateid:	{ id:$scope.withTemplateItem.selected.value }
						};

				TestDataGenService.validateTestCaseName($scope.testCaseName).then(
				function(d){
					if(d)
						{
						 notifications.showError('Test Case Name already exists!');

						}
					else
						{
						if($scope.withModuleItem.selected.value !=$scope.withTemplateItem.selected.type){
							notifications.showError('Choose template according to the module!');
						}else{
						TestDataGenService.insertTestCaseDetails($scope.testDetails).then(
				   	            function(d) {
				   	            	console.log("insertTestDetails response  ::  "+d);
				   	            	
				   	         		insertTestData(d);
				   	            	},function(errResponse){
				   	            		console.error('Error while fetching insertTestDetails');
				           }
				   	 	);
						}
						}
				},function(errResponse){
				   	            		console.error('Error while validating TestCaseName');
				           });

			}
			else {
				console.log("inside  ::  "+operationType+"  ::  "+$scope.withTestItem.selected.value);
				$scope.csvFileName = $scope.withTestItem.selected.label;
				$scope.testDetails={
						testcaseName:$scope.withTestItem.selected.label,
						module:$scope.withModuleItem.selected.label,
						operation:$scope.withOperationItem.selected.label,
						env:$scope.withEnvironmentItem.selected.label,
						noofRows:$scope.noOfRows,
						templateid:	{ id:$scope.withTemplateItem.selected.value }
						};
				TestDataGenService.updateTestCaseDetails($scope.testDetails,$scope.withTestItem.selected.value).then(
		   	            function(d) {
		   	            	console.log("updateTestCaseDetails response  ::  "+d);
		   	            	var url = "";
		   	            	if(operationType == 'Update')
		   	            		{
		   	            		url = 'fetchtestfiledata/';
		   	            		fetchRehireData($scope.withTestItem.selected.value,url);
		   	            		}
		   	            	else
		   	            		{
		   	            		url = 'fetchrehiredata/';
		   	         		fetchRehireData($scope.withTestItem.selected.value,url);
		   	            }
		   	            	},function(errResponse){
		   	            		console.error('Error while fetching updateTestCaseDetails');
		           }
		   	 	);
			}



			/*console.log("$scope.testData  ::  "+$scope.testData);
			console.log("$scope.lookupData.length  ::  "+$scope.lookupData.length);*/

		};

		function insertTestData(testCaseId) {
			var operationType = $scope.withOperationItem.selected.label;
			var module = $scope.withModuleItem.selected.label;
			var url = "";
			if(operationType == "Joiner" && module == "Life Cycle Events") {
				url = 'testcasedetails/';
			}
			else if( operationType == "New" && module == "Access Request")
				{
				console.log("inside acc request new operation insert test data"+module+"......."+operationType);
				url = 'testdataaccess/';
				}
			else if( operationType == "New" && module == "Generic Type")
			{
			url = 'testcasedetails/';
			}
			TestDataGenService.insertTestData(testCaseId,url).then(

	            function(d) {
	            	if(!$.trim(d))
	            		{
	            		notifications.showError("Please upload a csv file before generating test data!");
	            		}
	           else{
	            	$scope.testData = d;
	            	var flag = false;
	            	angular.forEach($scope.testData, function(value,key){
	            		if(flag == false){
	            		//console.log("$scope.lookupData  ::  "+value.testCaseDetails.templateid.lookupData);
	            		$scope.lookupData = value.testCaseDetails.templateid.lookupData;
	            		//console.log("$scope.lookupData.length  ::  "+$scope.lookupData.length);
	            		angular.forEach($scope.lookupData, function(value,key){
	            			console.log("$scope.lookupData values  :::::  "+value.sysFieldName);
	            		});
	            		$scope.tableDataArray = [];
	            		for(var i=0;i<$scope.lookupData.length;i++) {
	            			$scope.tableDataArray[i] = i;
	            		}
	            		flag = true;
	            		}
	            	});
	            	notifications.showSuccess('Test Data Generated');
	            }
	            	},function(errResponse){
	            		console.error('Error while insertTestData');
       }
	 	);

		}
		function fetchRehireData(testCaseId,url) {
			TestDataGenService.fetchRehireData(testCaseId,url).then(
	   	            function(d) {
	   	            	$scope.testData = d;
	   	            	angular.forEach($scope.testData, function(value,key){
	   	            		//console.log("$scope.lookupData  ::  "+value.testCaseDetails.templateid.lookupData);
	   	            		$scope.lookupData = value.testCaseDetails.templateid.lookupData;
	   	            		//console.log("$scope.lookupData.length  ::  "+$scope.lookupData.length);
	   	            		/*angular.forEach($scope.lookupData, function(value,key){
	   	            			console.log("$scope.lookupData values  :::::  "+value.sysFieldName);
	   	            		});*/
	   	            		$scope.tableDataArray = [];
	   	            		for(var i=0;i<$scope.lookupData.length;i++) {
	   	            			$scope.tableDataArray[i] = i;
	   	            		}
	   	            	});
	   	            	notifications.showSuccess('Test Data Generated');
	   	            	},function(errResponse){
	   	            		console.error('Error while fetchRehireData');
	           }
	   	 	);
		}

				/*$scope.downLoadCsv = function() {
			var ele = document.getElementById('testDataTable');
			var blob = new Blob([ele.innerText], {
			        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
			    });
			 var anchor = angular.element('<a/>');
		     anchor.attr({
		         href: 'data:attachment/csv;charset=utf-8,' + encodeURI(ele.innerText),
		         target: '_blank',
		         download: 'filename.csv'
		     })[0].click();

			notifications.showSuccess('CSV File Downloaded');
			    //saveAs(blob, $scope.csvFileName+"_"+$scope.withOperationItem.selected.label+".csv");
			};*/
			$scope.downLoadSql = function(testData) {
				var testCaseId ;
				var sqlFileName =  $scope.csvFileName+"_"+$scope.withOperationItem.selected.label+".sql";
				console.log("sqlFileName data...:: ",sqlFileName);
				var flag = false;
            	angular.forEach($scope.testData, function(value,key){
            		if(flag == false){
            			testCaseId = value.testCaseDetails.testcaseID;
            			console.log("testcaseId :: "+testCaseId);
            		 flag = true;
            		}
            	});
				TestDataGenService.downLoadSql(testCaseId,sqlFileName).then(
		   	            function(d) {
		   	            	console.log("response :: ",d);
		   	             var disposition = d.headers('Content-Disposition');
		   	             console.log("disposition :: "+disposition);
		   	             var filename = disposition.split("=")[1];
	                     //   var filename = contentDisposition;
	                        console.log("filename :: "+filename);
	                        var anchor = angular.element('<a/>');
	                        anchor.attr({
	                            href: 'data:attachment/sql;charset=utf-8,' + encodeURI(d.data),
	                            target: '_blank',
	                            download: filename+'.sql'
	                        })[0].click();


		   	            	notifications.showSuccess('SQL Script File Downloaded');
		   	         	},function(errResponse){
		   	            		console.error('Error while downloading SQL script file');
		           }
		   	 );
				};

				$scope.downLoadCsv = function(testData) {
					var testCaseId ;
					var csvFileName =  $scope.csvFileName+"_"+$scope.withOperationItem.selected.label+".csv";
					console.log("csvFileName data...:: ",csvFileName);
					var flag = false;
	            	angular.forEach($scope.testData, function(value,key){
	            		if(flag == false){
	            			testCaseId = value.testCaseDetails.testcaseID;
	            			console.log("testcaseId :: "+testCaseId);
	            		 flag = true;
	            		}
	            	});
					TestDataGenService.downLoadCsv(testCaseId,csvFileName).then(
			   	            function(d) {
			   	            	console.log("response :: ",d);
			   	             var disposition = d.headers('Content-Disposition');
			   	             console.log("disposition :: "+disposition);
			   	             var filename = disposition.split("=")[1];
		                     //   var filename = contentDisposition;
		                        console.log("filename :: "+filename);
		                        var anchor = angular.element('<a/>');
		                        anchor.attr({
		                            href: 'data:attachment/csv;charset=utf-8,' + encodeURI(d.data),
		                            target: '_blank',
		                            download: filename+'.csv'
		                        })[0].click();


			   	            	notifications.showSuccess('CSV File Downloaded');
			   	         	},function(errResponse){
			   	            		console.error('Error while downloading .csv file');
			           }
			   	 );
					};

			  editableOptions.theme = 'bs3';
		      editableThemes['bs3'].submitTpl = '<button type="submit" class="btn btn-primary btn-with-icon"><i class="glyphicon glyphicon-ok"></i></button>';
		      editableThemes['bs3'].cancelTpl = '<button type="button" ng-click="$form.$cancel()" class="btn btn-default btn-with-icon"><i class="glyphicon glyphicon-remove"></i></button>';

		      $scope.getRowEntry = function(index) {
		    	  console.log("index  ::  "+index);
		    	  for (var d = 0; d < index; d += 1) {
		    	        /*if ($scope.lookupData[d].id === id) {
		    	            return arr[d];
		    	        }*/
		    		  console.log("$scope.lookupData[d]  ::  "+$scope.testData[d].testdataGenId+"  ::  "+$scope.testData[d].value);
		    	    }
		      };

		      $scope.getRecord = function(event,data) {
		    	  console.log("getRecord index  ::  "+event.target.id);
		    	  console.log($(event.target).attr("data-id"));
		    	  //console.log("$scope.lookupData[d]  ::  "+$scope.testData[id].testdataGenId+"  ::  "+"data  ::  "+data);
		      };

		      $scope.updateTestData = function(testGenId,data) {
		    	  console.log("getRecord index  ::  "+data+"  ::  testGenId  ::  "+testGenId);
		    	  var dataDetails={
		    			  testCaseDetails:{testcaseID:$scope.withTestItem.selected.value},
		    			  //lookupData:{lookupID:id},
		    			  value:data
		    			  };
		    	  TestDataGenService.updateTestData(dataDetails,testGenId).then(
			   	            function(d) {
			   	            	notifications.showSuccess('Data Updated');
			   	            	},function(errResponse){
			   	            		console.error('Error while updateTestData');
			           }
			   	 	);
		      };


		      $scope.showDetails = function(testCaseId) {
		    	 console.log("testCaseId  ::  "+testCaseId.value);
		    	 var caseId = testCaseId.value;
		    	 TestDataGenService.fetchTestCaseById(caseId).then(
	   	            function(d) {
	   	            	$scope.withEnvironmentItem.selected.label = d.env;
	   	            	$scope.withTemplateItem.selected.value = d.templateid.id;
	   	            	$scope.withTemplateItem.selected.label = d.templateid.templateName;
	   	            	//$scope.noOfRows = d.noofRows;
	   	            	},function(errResponse){
	   	            		console.error('Error while fetchTestCaseById');
			           }
			   	 	);
		      };
		   	  };

	})();
