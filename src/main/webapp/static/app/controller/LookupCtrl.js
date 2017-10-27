(function() {
	'use strict';

	angular.module('app.pages.lookup').controller('LookupCtrl', LookupCtrl);

	/** @ngInject */
	function LookupCtrl($scope, $filter, editableOptions, editableThemes,
			$uibModal, $http, notifications, $window, fileUpload, lookupService) {
		console.log("inside LookupCtrl");
		$scope.lookupData = [];
		var urlBase = "";
		$scope.templatePanelShow = false;
		$scope.flagShow = true;
		$scope.applicationNames = undefined;

		fetchFileDetails();
		$scope.appNames = [];
		// $scope.roles = null;
		$http.defaults.headers.post["Content-Type"] = "application/json";

		$scope.templateGroup = [ {
			"id" : 1,
			templateName : "Template1"
		}, {
			"id" : 2,
			templateName : "Template2"
		} ];

		$scope.lookupDataLife = [ {
			"id" : 1,
			"sysFieldName" : "Employee_Id",
			"dataType" : "EmployeeId",
			"showEntry" : true,
			"disableEntry" : false
		}, {
			"id" : 2,
			"sysFieldName" : "Employee_Name",
			"dataType" : 'Name',
			"showEntry" : true,
			"disableEntry" : false
		}, {
			"id" : 3,
			"sysFieldName" : "First_Name",
			"dataType" : 'FirstName',
			"showEntry" : true,
			"disableEntry" : false

		}, {
			"id" : 4,
			"sysFieldName" : "Last_Name",
			"dataType" : "LastName",
			"showEntry" : true,
			"disableEntry" : false
		}, {
			"id" : 5,
			"sysFieldName" : "Email_Id",
			"dataType" : "Email",
			"showEntry" : true,
			"disableEntry" : false
		}, {
			"id" : 6,
			"sysFieldName" : "Manager_Id",
			"dataType" : "None",
			"showEntry" : true,
			"disableEntry" : false
		} ];

		$scope.dataTypes = [ {
			value : 'Name',
			text : 'Name'
		}, {
			value : 'FirstName',
			text : 'FirstName'
		}, {
			value : 'LastName',
			text : 'LastName'
		}, {
			value : 'Number',
			text : 'Number'
		}, {
			value : 'Email',
			text : 'Email'
		}, {
			value : 'Date',
			text : 'Date'
		}, {
			value : 'EmployeeId',
			text : 'EmployeeId'
		}, {
			value : 'EmployeeStatus',
			text : 'EmployeeStatus'
		}, {
			value : 'None',
			text : 'None'
		} ];

		$scope.showdataType = function(lookupData) {
			var selected = [];
			if (lookupData.dataType) {
				selected = $filter('filter')($scope.dataTypes, {
					value : lookupData.dataType
				});
			}
			return selected.length ? selected[0].text : 'Not set';
		};

		$scope.showdataTypeAction = function(lookupDataAccess) {
			var selected = [];
			if (lookupDataAccess.dataType) {
				selected = $filter('filter')($scope.dataTypesAction, {
					value : lookupDataAccess.dataType
				});
			}
			return selected.length ? selected[0].text : 'Not set';
		};

		$scope.showdataTypeDecision = function(lookupDataAccess) {
			var selected = [];
			if (lookupDataAccess.dataType) {
				selected = $filter('filter')($scope.dataTypesDecision, {
					value : lookupDataAccess.dataType
				});
			}
			return selected.length ? selected[0].text : 'Not set';
		};

		$scope.removeEntry = function(index) {
			$scope.lookupData.splice(index, 1);
		};

		$scope.addEntry = function() {
			$scope.inserted = {
				id : $scope.lookupData.length + 1,
				sysFieldName : '',
				dataType : null,
				showEntry : true,
				disableEntry : false
			};
			$scope.lookupData.push($scope.inserted);
		};

		editableOptions.theme = 'bs3';
		editableThemes['bs3'].submitTpl = '<button type="submit" class="btn btn-primary btn-with-icon"><i class="ion-checkmark-round"></i></button>';
		editableThemes['bs3'].cancelTpl = '<button type="button" ng-click="$form.$cancel()" class="btn btn-default btn-with-icon"><i class="ion-close-round"></i></button>';

		$scope.open = function(page, size) {
			$uibModal.open({
				animation : true,
				templateUrl : page,
				size : size,
				controller : 'LookupCtrl',
				scope : $scope,
			});
		};

		$scope.lookupResposeBody = {
			"templateName" : $scope.templateName,
			"templateType" : $scope.templateType,
			"lookupData" : $scope.lookupData,
			"other" : $scope.other
		};

		// console.log("$scope.lookupResposeBody :: "+$scope.templateName+" ::
		// "+$scope.lookupData[0]);

		$scope.lookupDataAccess = [ {
			"id" : 1,
			"sysFieldName" : "Action",
			"dataType" : "New",
			"showEntry" : true,
			"disableEntry" : true
		}, {
			"id" : 2,
			"sysFieldName" : "Manager Approve/Reject",
			"dataType" : "Approve",
			"showEntry" : true,
			"disableEntry" : true
		}, {
			"id" : 3,
			"sysFieldName" : "L2 Approve/Reject",
			"dataType" : "Approve",
			"showEntry" : true,
			"disableEntry" : true
		}, {
			"id" : 4,
			"sysFieldName" : "RA Approve/Reject",
			"dataType" : "Reject",
			"showEntry" : true,
			"disableEntry" : true
		}, {
			"id" : 5,
			"sysFieldName" : "Application Name",
			"dataType" : "None",
			"showEntry" : true,
			"disableEntry" : true
		}, {
			"id" : 6,
			"sysFieldName" : "formType",
			"dataType" : "None",
			"showEntry" : false,
			"disableEntry" : true
		}, {
			"id" : 7,
			"sysFieldName" : "employeeId",
			"dataType" : "EmployeeId",
			"showEntry" : false,
			"disableEntry" : true
		}, {
			"id" : 8,
			"sysFieldName" : "employeeName",
			"dataType" : "Name",
			"showEntry" : false,
			"disableEntry" : true
		}, {
			"id" : 9,
			"sysFieldName" : "managerId",
			"dataType" : "None",
			"showEntry" : false,
			"disableEntry" : true
		}, {
			"id" : 10,
			"sysFieldName" : "L2ApproverId",
			"dataType" : "None",
			"showEntry" : false,
			"disableEntry" : true
		}, {
			"id" : 11,
			"sysFieldName" : "RA_Id",
			"dataType" : "None",
			"showEntry" : false,
			"disableEntry" : true
		}

		];

		$scope.dataTypesAction = [ {
			value : 'New',
			text : 'New'
		}, {
			value : 'Modify',
			text : 'Modify'
		}, {
			value : 'Delete',
			text : 'Delete'
		}, {
			value : 'Additional',
			text : 'Additional'
		}, ];

		$scope.dataTypesDecision = [ {
			value : 'Approve',
			text : 'Approve'
		}, {
			value : 'Reject',
			text : 'Reject'
		}, ];
		$scope.saveTemplate = function() {
			if ($scope.templateName != null && $scope.lookupData.length != 0
					&& $scope.templateName.length > 0) {
				var templateName = $scope.templateName;
				$http
						.get('validatetemplate/' + templateName)
						.success(
								function(data, status, headers) {
									console.log("data  ::  " + data);
									if (data) {
										notifications
												.showError('Template Name already exists!');
									} else {
										// console.log("$scope.templateType ::
										// "+$scope.templateType);
										if ($scope.templateType == 2) {
											var flagApp = false;
											if($scope.applicationNames)
												{
											console.log('inside if'+$scope.applicationNames);
											var appsAbscent = "";
											var tempArray = $scope.applicationNames
													.split(",");
											for (var i = 0; i < tempArray.length; i++) {
												console
														.log("tempArray.length :: "
																+ tempArray.length);
												if ($scope.appNames.indexOf(tempArray[i]) == -1) {
													console.log("tempArray[i] :: "+ tempArray[i]);
													appsAbscent = appsAbscent+ tempArray[i]+ " ";
													flagApp = true;
												}
												console.log("appsAbscent :: "+ appsAbscent);
											}
											if (flagApp) {
												console.log("Entered applications "+ appsAbscent+ "are abscent in the chosen file!");
												notifications.showError("Entered applications "+ appsAbscent+ "are abscent in the chosen file!");
											}
											} 
											if(!flagApp || !$scope.applicationNames){
												var id = $scope.lookupDataAccess[$scope.lookupDataAccess.length - 1].id + 1;
												lookupService.fetchRoles($scope.applicationNames,$scope.other)
												.then(function(d) {
													console.log('d  ::  ',d);
														angular.forEach(d,function(value,key) {
												console.log('value  ::  ',value);
												$scope.lookupDataAccess.push({
													"id" : id,
													"sysFieldName" : value,
													"dataType" : "None",
													"showEntry" : false,
													"disableEntry" : true
														});
														id++;
														});
										console.log("$scope.lookupDataAccess length  :::::  "+ $scope.lookupDataAccess.length);
										persistTemplate($scope.lookupDataAccess);

																},
																function(
																		errResponse) {
																	console
																			.error('Error while fetching fetchRoles');
																});
												
											}
										
										} else {
											var indexes = [];
											angular.forEach($scope.lookupData,
													function(value, key) {
												console.log("value  :: ",value);
												console.log("  key   ......   ",key);
												console.log("value.sysFieldName   :: ",value.sysFieldName );
												console.log("value.dataType  :: ",value.dataType);
												console.log("value.id  :: ",value.id);
												if (!value.sysFieldName || !value.dataType) {
												//	var index = $scope.lookupData.indexOf(value);
													var index = value;
													console.log("index :: "+index);
												//	$scope.removeEntry(index);
													indexes.push(index);
													console.log("in remove loop after");
												}
													});
											angular.forEach(indexes,
													function(value, key) {
												var arrayIndex = $scope.lookupData.indexOf(value);
												$scope.removeEntry(arrayIndex);
											});
											persistTemplate($scope.lookupData);
										}
									}

								});
			} else {
				if ($scope.templateName == null) {
					notifications.showError('Template Name is required');
				} else {
					notifications.showError('Minimum one row is required');
				}
			}
		};

		function persistTemplate(lookupData) {
			$http.post(urlBase + 'lookupdata/', {
				templateName : $scope.templateName,
				templateType : $scope.templateType,
				lookupData : lookupData,
				other : $scope.other
			}).success(function(data, status, headers) {
				console.log("data  ::  " + data);
				notifications.showSuccess('Template Saved');
				$scope.templateName = null;
				$scope.lookupData = [];
			});
		}
		;

		$scope.createTemplate = function() {
			console.log("createTemplate  ::  " + createTemplate);
			window.href.location = "#/lookupcreate";
		};

		$scope.withTemplateItem = {};

		$scope.selectFileItems = [];

		$scope.selectTemplateItems = [ {
			label : 'Life Cycle Events',
			value : 1
		}, {
			label : 'Access Request',
			value : 2
		}, {
			label : 'Generic Template',
			value : 3
		} ];

		$scope.onSelectTemplateType = function(templateType) {
			console.log("inside onSelectTemplateType  ::  "
					+ templateType.label);
			$scope.templateType = templateType.value;
			console.log("inside onSelectTemplateType templatetype value ::  "
					+ $scope.templateType);
			if (templateType.label == 'Access Request') {
				$scope.lookupData = $scope.lookupDataAccess;

				$scope.flagShow = false;

			}else if(templateType.label == 'Life Cycle Events'){
				$scope.lookupData = $scope.lookupDataLife;
				$scope.flagShow = true;
			}else if(templateType.label == 'Generic Template'){
				$scope.lookupData = [];
				$scope.flagShow = true;
			}


			$scope.templatePanelShow = true;
		};

		function fetchFileDetails() {
			console.log("inside fetchFileDetails");
			fileUpload
					.fetchFileDetails()
					.then(
							function(d) {
								angular.forEach(d, function(value, key) {
									console.log("File Details ::  ", value);
									$scope.selectFileItems.push({
										label : value.fileName,
										value : value.fileId
									});
									console.log("$scope.file  ::  "
											+ $scope.selectFileItems.label);
								});
							},
							function(errResponse) {
								console
										.error('Error while fetching fetchFileDetails in lookupctrl');
							});
		}

		$scope.onSelectFile = function(file) {
			console.log("inside onSelectFile  ::  " + file.value);
			$scope.other = file.value;

			console.log("inside fetchFileDetailsById" + $scope.other);
			fileUpload
					.fetchFileDetailsById(file.value)
					.then(
							function(d) {
								console.log("fileData.......  ::  ", d);
								$scope.fileData = d;
								var flags = [];
								angular
										.forEach(
												d,
												function(value, key) {
													if ($scope.appNames
															.indexOf(value.application) == -1) {
														$scope.appNames
																.push(value.application);
													}

												});
								console.log("value of app names of file :: "
										+ $scope.appNames);
							}, function(errResponse) {
								console.error('Error in fetchFileDetailsById');
							});

		};

		$scope.onApplicationSubmit = function(rowFormData, index) {
			console.log("rowFormData  ::  ", rowFormData);
			if (!rowFormData.sysFieldName || !rowFormData.dataType) {
				$scope.removeEntry(index);
			}
			if (rowFormData.sysFieldName == "Application Name") {
				console.log("Application Name :: ", rowFormData.sampleData);
				$scope.applicationNames = rowFormData.sampleData;
				console.log("Application Name from scope variable:: ",
						$scope.applicationNames);

				/*
				 * $http.get('rolecolumns/'+rowFormData.sampleData).
				 * then(function(data, status, headers) {
				 * 
				 * console.log("data in role columns :: ",data); var values =
				 * data;
				 * 
				 * console.log("last id ::
				 * "+$scope.lookupDataAccess[$scope.lookupDataAccess.length -
				 * 1].id);
				 *  // var id = 12; // console.log("last id fixed :: "+id); var
				 * id = $scope.lookupDataAccess[$scope.lookupDataAccess.length -
				 * 1].id + 1;
				 * 
				 * angular.forEach(values, function(value, key) {
				 * if(key=="data") { var roles = value;
				 * 
				 * angular.forEach(roles, function(value, key) {
				 * $scope.lookupDataAccess.push({ "id" : id, "sysFieldName" :
				 * value, "dataType" : "None", "showEntry":false }); //
				 * this.push('{id:'+id+','+'sysFieldName:"'+value+'",'+'dataType:"None"}');
				 * id++; }); } }); }, function(errResponse) { console.log("error
				 * in role columns fetching :: "+ errResponse); });
				 */
			}
		};

	}

})();
