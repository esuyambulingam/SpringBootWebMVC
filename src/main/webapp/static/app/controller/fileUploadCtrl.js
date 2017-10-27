(function () {
  'use strict';

  angular.module('app')
  .controller('fileUploadCtrl',fileUploadCtrl);

  /** @ngInject */

  function fileUploadCtrl($scope,$filter, editableOptions, editableThemes, $uibModal, $http, notifications, fileUpload)
  {
	  console.log("inside fileUploadCtrl");

	  		$scope.files = [];
            fetchFileDetails();


            $scope.fileData = [];
            $scope.openFileModel = function (fileId) {
          	  console.log("fileId  ::  "+fileId);

          	  fetchFileDetailsById(fileId);

            };

/*
            $scope.ResposeBody = {

            		"fileData":$scope.fileData
            };
*/

            $scope.uploadFile = function(){
            	if(!$scope.myFile){
            		console.log("choose file");
            		notifications.showError("Choose File to Upload!");
            	}
            	else{
               console.log('file is ',$scope.myFile.name);
                	 console.dir($scope.myFile);
                     var file = $scope.myFile;
                     var uploadURL = "uploadFile";
               fileUpload.uploadFileToUrl(file,uploadURL);
            	}

            };

            function fetchFileDetails() {
    			console.log("inside fetchFileDetails");
    			fileUpload.fetchFileDetails().then(
    	   	            function(d) {
    	   	            	angular.forEach(d, function(value, key){
    	   	            		console.log("File Details ::  ",value);
    	   	            		$scope.files.push({fileName:value.fileName,fileId:value.fileId});
    	   	            		console.log("$scope.file  ::  "+$scope.files.fileName);
    	   	         	});
    	   	            	},function(errResponse){
    	   	            		console.error('Error while fetching fetchFileDetails');
    	           }
    	   	 );
    		}

            function fetchFileDetailsById(fileId) {
    			console.log("inside fetchFileDetailsById"+fileId);
    			fileUpload.fetchFileDetailsById(fileId).then(
    	   	            function(d) {
    	   	         	console.log("fileData.......  ::  ",d);
    	   	         	$scope.fileData=d;
    	   	         angular.forEach(d, function(value, key){
    	   	        	 if(key==0)
    	   	        	 {
    	   	   $scope.fileName=value.fileDetails.fileName;
    	   	   console.log("filename.......",$scope.fileName);

    	   	        	 }
    	   	         });
    	   	         $uibModal.open({
   	                     animation: true,
   	                     templateUrl: 'static/app/pages/lookup/table/fileDataView.html',
   	                     size: 'lg',
   	                     //controller: 'fileUploadCtrl',
   	                     scope: $scope,
   	                   });
   	            	},function(errResponse){
    	   	            		console.error('Error in fetchFileDetailsById');
    	           }
    	   	 );
    		}

  };
})();
