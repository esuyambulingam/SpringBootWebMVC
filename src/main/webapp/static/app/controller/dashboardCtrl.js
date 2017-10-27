
(function () {
  'use strict';

  angular.module('app')
      .controller('dashboardCtrl', dashboardCtrl);
  
  function dashboardCtrl($scope, $filter, editableOptions, editableThemes, $uibModal, $http, notifications, TestDataGenService) {
	  
	  $scope.newDropdown =false;
	  $scope.anotherDropdown = false;
	  $scope.menuDisplayed=true;
	  $scope.dashboardItem={};
	  $scope.thingItem={};
	  
	  /*var AdminLTEOptions = {
			    //Enable sidebar expand on hover effect for sidebar mini
			    //This option is forced to true if both the fixed layout and sidebar mini
			    //are used together
			    sidebarExpandOnHover: true,
			    //BoxRefresh Plugin
			    enableBoxRefresh: true,
			    //Bootstrap.js tooltip
			    enableBSToppltip: true
			  };
	  */
	  $scope.toggle= function(dashboard,dashboardType){
		  if($scope.thingItem.value != dashboardType.value)
			{
				$scope.newDropdown=false;
			}
	  }	 
	  $scope.toggleClick= function(dashboard,dashboardType){
		  $scope.thingItem = dashboardType;
			 $scope.newDropdown = !$scope.newDropdown;
		  $scope.onSelectDashboardTypes(dashboard,dashboardType);
	  }	 
	  
	  $scope.dashboard={};
	  $scope.dashboardType={};
	  
	  $scope.falsify= function(item){
		 $scope.newDropdown = false;
		if($scope.dashboardItem.value != item.value)
		{
			$scope.anotherDropdown=false;
		}
		
	  }	
	  $scope.falsifyClick= function(dashboard){
		  $scope.newDropdown = false;
		  $scope.dashboardItem=dashboard;	  
		  $scope.anotherDropdown = !$scope.anotherDropdown;
		  $scope.onSelectDashboard(dashboard);
			  
		  }	
	  
	 $scope.toggling = function(){
		 $scope.newDropdown =false;
		  $scope.anotherDropdown = false;
		// $scope.menuDisplayed = !$scope.menuDisplayed;
angular.element(document.querySelector( "#wrapper") ).toggleClass("menuDisplayed");
	  }
	
		
		 $scope.dashboards = [
		        {value: '1', label: 'Shared- Daily leadership'},
		        {value: '2', label: 'Dedicated - Daily leadership'},
		        {value: '3', label: 'Dedicated - Daily Account level'},
		        {value: '4', label: 'Dedicated Weekly Dashboard'},
		        {value: '5', label: 'Dedicated Monthly Dashboard'}
		      ];
		 
		
		 
		 $scope.onSelectDashboard = function(Dashboard) {
			 console.log("inside onSelectDashboard ::  "+Dashboard.label);
			if( Dashboard.value=='1')
				{
				$scope.dashboard.dashboardTypes = [
           	        { label: 'Total Pending Count (IN + SR)', value: 1 ,link:"http://10.242.237.198:5601/goto/2883d6e574c6d95a9c2078172c844f04"},
           	        { label: 'INCIDENT DASHBOARDS', value: 2 ,link:""},
           	        { label: 'SR DASHBOARDS', value: 3 ,link:""},
           	        { label: 'CR DASHBOARDS', value: 4 ,link:""}
           	      ];
				}
			else if( Dashboard.value=='2')
				{
				$scope.dashboard.dashboardTypes = [
           	        { label: 'Total Pending Count (IN + SR)', value: 1 ,link:"http://10.242.237.198:5601/goto/8e5ca70919cd6d039035ae5a22a6efba"},
           	     { label: 'INCIDENT DASHBOARDS', value: 2 ,link:""},
        	        { label: 'SR DASHBOARDS', value: 3,link:""},
        	        { label: 'CR DASHBOARDS', value: 4 ,link:""}
           	      ];
				}
			else if( Dashboard.value=='3')
			{
				$scope.dashboard.dashboardTypes = [
       	        { label: 'Total Pending Count (IN + SR)', value: 1 ,link:"http://10.242.237.198:5601/goto/8e5ca70919cd6d039035ae5a22a6efba"},
       	        { label: 'INCIDENT DASHBOARDS', value: 2 ,link:""},
       	        { label: 'SR DASHBOARDS', value: 3 ,link:""},
       	        { label: 'CR DASHBOARDS', value: 4,link:""}
       	      ];
			}
			else if( Dashboard.value=='4')
			{
				$scope.dashboard.dashboardTypes = [
       	        { label: 'Total Pending Count (IN + SR)', value: 1 ,link:"http://10.242.237.198:5601/goto/8e5ca70919cd6d039035ae5a22a6efba"},
       	        { label: 'INCIDENT DASHBOARDS', value: 2 ,link:""},
       	        { label: 'SR DASHBOARDS', value: 3 ,link:""},
       	        { label: 'CR DASHBOARDS', value: 4 ,link:""}
       	      ];
			}
			else if( Dashboard.value=='5')
			{
				$scope.dashboard.dashboardTypes = [
       	        { label: 'Total Pending Count (IN + SR)', value: 1 ,link:"http://10.242.237.198:5601/goto/8e5ca70919cd6d039035ae5a22a6efba"},
       	        { label: 'INCIDENT DASHBOARDS', value: 2 ,link:""},
       	        { label: 'SR DASHBOARDS', value: 3 ,link:""},
       	        { label: 'CR DASHBOARDS', value: 4 ,link:""}
       	      ];
			}
		 }
		 
		 
		 $scope.onSelectDashboardTypes = function(Dashboard, DashboardType) {
			 console.log("inside onSelectDashboardTypes ::  "+DashboardType.label);
			 if(Dashboard.value =='1')
				 {
				 
				 if(DashboardType.value =='1')
					 {
					  $scope.newDropdown = false;
					 }
				 else if(DashboardType.value=='2')
					{
					$scope.dashboardType.dashboardUrls = [
						{label:'Incidents Received & Closed Counts',value:1,link:"http://10.242.237.198:5601/goto/f12ee87ee9eef83b3f3bae2dddcb3089"},
						{label:'Incidents Ageing Report',value:2,link:"http://10.242.237.198:5601/goto/92ac8ca4f80fea72dddfc04006546f84"},
						{label:'P1/P2 Incident Record',value:3,link:""},
						{label:'SLA Breach #s',value:4,link:"http://10.242.237.198:5601/goto/92ac8ca4f80fea72dddfc04006546f84"},
						{label:'Incident Breakup',value:5,link:"http://10.242.237.198:5601/goto/23e772c599fa2f39da18f8603ddf58fd"}
					];
					}
				else if(DashboardType.value=='3')
					{
					$scope.dashboardType.dashboardUrls = [
						{label:'SR Received & Closed counts ',value:1,link:"http://10.242.237.198:5601/goto/410564aecd3bdf2bbbf45abcb4476c97"},
						{label:'SR Ageing Report',value:2,link:"http://10.242.237.198:5601/goto/5d8b9bd728664faeb124a4b3f5e7bf01"},
						{label:'P1/P2 SR record',value:3,link:""},
						{label:'SLA Breach #s',value:4,link:"http://10.242.237.198:5601/goto/22a85ae5fc945a926f3731cfe7042fc0"},,
						{label:'SR Breakup',value:5,link:"http://10.242.237.198:5601/goto/3bde9afed792828dd4df4d80ff795519"}
					];
					}
				else if(DashboardType.value=='4')
				{
				$scope.dashboardType.dashboardUrls = [
					{label:'Open CR Counts- Company wise',value:1,link:"http://10.242.237.198:5601/goto/33fcd760923f90d8050936da4abc75dd"},
					{label:'Change Status <Today>',value:2,link:""}
				];
				}
				 }
			 else  if(Dashboard.value =='2')
				 {
				 if(DashboardType.value =='1')
				 {
				  $scope.newDropdown = false;
				 }
				 else if(DashboardType.value=='2')
					{
					$scope.dashboardType.dashboardUrls = [
						{label:'Incidents Received & Closed Counts',value:1,link:""},
						{label:'Incidents Ageing Report',value:2,link:""},
						{label:'P1/P2 Incident Record',value:3,link:""},
						{label:'SLA Breach #s',value:4,link:""},
						{label:'Incident Breakup',value:5,link:""}
					];
					}
				else if(DashboardType.value=='3')
					{
					$scope.dashboardType.dashboardUrls = [
						{label:'SR Received & Closed counts ',value:1,link:""},
						{label:'SR Ageing Report',value:2,link:""},
						{label:'P1/P2 SR record',value:3,link:""},
						{label:'SLA Breach #s',value:4,link:""},,
						{label:'SR Breakup',value:5,link:""}
					];
					}
				else if(DashboardType.value=='4')
				{
				$scope.dashboardType.dashboardUrls = [
					{label:'Open CR Counts- Company wise',value:1,link:""},
					{label:'Change Status <Today>',value:2,link:""}
				];
				}
				 }
			 else  if(Dashboard.value =='3')
			 {
		 
				 if(DashboardType.value =='1')
				 {
				  $scope.newDropdown = false;
				 }
				 else if(DashboardType.value=='2')
				{
				$scope.dashboardType.dashboardUrls = [
					{label:'Incidents Received & Closed Counts',value:1,link:""},
					{label:'Incidents Ageing Report',value:2,link:""},
					{label:'P1/P2 Incident Record',value:3,link:""},
					{label:'SLA Breach #s',value:4,link:""}
				];
				}
			else if(DashboardType.value=='3')
				{
				$scope.dashboardType.dashboardUrls = [
					{label:'SR Received & Closed counts ',value:1,link:""},
					{label:'SR Ageing Report',value:2,link:""},
					{label:'P1/P2 SR record',value:3,link:""},
					{label:'SLA Breach #s',value:4,link:""}
				];
				}
			else if(DashboardType.value=='4')
			{
			$scope.dashboardType.dashboardUrls = [
				{label:'Open CR Counts',value:1,link:""},
				{label:'Change Status <Today>',value:2,link:""}
			];
			}
			 }
			 else  if(Dashboard.value =='4')
			 {
		 
			 if(DashboardType.value=='2')
				{
				$scope.dashboardType.dashboardUrls = [
					{label:'Incidents Received & Closed Counts',value:1,link:""},
					{label:'Incidents Ageing Report',value:2,link:""},
					{label:'P1/P2 Incident Record',value:3,link:""},
					{label:'SLA metric for the week',value:4,link:""},
					{label:'Tool wise weekly Incident created trend',value:5,link:""}
				];
				}
			else if(DashboardType.value=='3')
				{
				$scope.dashboardType.dashboardUrls = [
					{label:'SR Received & Closed counts ',value:1,link:""},
					{label:'SR Ageing Report',value:2,link:""},
					{label:'P1/P2 SR record',value:3,link:""},
					{label:'Tool wise weekly SR created trend',value:4,link:""}
				];
				}
			else if(DashboardType.value=='4')
			{
			$scope.dashboardType.dashboardUrls = [
				{label:'Open CR Counts',value:1,link:""},
				{label:'Change Status <This week>',value:2,link:""}
			];
			}
			 }	
			 else  if(Dashboard.value =='5')
			 {
		 
				 if(DashboardType.value =='1')
				 {
				  $scope.newDropdown = false;
				 }
				 else if(DashboardType.value=='2')
				{
				$scope.dashboardType.dashboardUrls = [
					{label:'Incidents Received & Closed Counts',value:1,link:""},
					{label:'Incidents Ageing Report',value:2,link:""},
					{label:'P1/P2 Incident Record',value:3,link:""},
					{label:'SLA metric for the month',value:4,link:""},
					{label:'Tool wise weekly Incident created trend',value:5,link:""}
				];
				}
			else if(DashboardType.value=='3')
				{
				$scope.dashboardType.dashboardUrls = [
					{label:'SR Received & Closed counts ',value:1,link:""},
					{label:'SR Ageing Report',value:2,link:""},
					{label:'P1/P2 SR record',value:3,link:""},
					{label:'SLA metric for the month',value:4,link:""},
					{label:'Tool wise weekly SR created trend',value:5,link:""}
				];
				}
			else if(DashboardType.value=='4')
			{
			$scope.dashboardType.dashboardUrls = [
				{label:'Open CR Counts',value:1,link:""},
				{label:'Change Status <This week>',value:2,link:""}
			];
			}
			 }	
				console.log("$scope.dashboardType.dashboardUrls :: ",$scope.dashboardType.dashboardUrls);
		 }
		
		 }

})();
