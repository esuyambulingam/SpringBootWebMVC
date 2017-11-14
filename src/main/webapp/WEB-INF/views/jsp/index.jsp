<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
    <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html lang="en" ng-app="app">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="_csrf" content="${_csrf.token}"/>
  <meta name="_csrf_header" content="${_csrf.headerName}"/>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<meta http-equiv='Content-Security-Policy'  content="frame-src *,child-src *">	
  <title>SpringBoot Web MVC 123 </title>


	<link href="<c:url value='/static/css/bootstrap.css' />" rel="stylesheet" />
    <link href="<c:url value='/static/css/font-awesome.min.css' />" rel="stylesheet" />
    <link href="<c:url value='/static/css/animate.min.css' />" rel="stylesheet" />
    <link href="<c:url value='/static/css/prettyPhoto.css' />" rel="stylesheet" />
    <link href="<c:url value='/static/css/responsive.css' />" rel="stylesheet" />
    <link href="<c:url value='/static/css/xeditable.css' />" rel="stylesheet" />
    <link href="<c:url value='/static/css/bootstrap-select.css' />" rel="stylesheet" />
    <link href="<c:url value='/static/css/select.css' />" rel="stylesheet" />
    <link href="<c:url value='/static/css/ngNotificationsBar.min.css' />" rel="stylesheet" />
    <link href="<c:url value='/static/css/main.css' />" rel="stylesheet" />
     <link href="<c:url value='/static/css/sidebar.css' />" rel="stylesheet" />
     <link href="<c:url value='/static/css/ng-bootstrap-submenu.min.css' />" rel="stylesheet" />
     <link href="<c:url value='/static/css/ng-bootstrap-submenu.css' />" rel="stylesheet" />
    
</head>
<body>
<div class="body-bg"></div>

<main>
<notifications-bar class="notifications"></notifications-bar>

    <page-top></page-top>

  <div class="al-main">
    <div class="al-content">
      <div ui-view autoscroll-body-top></div>
    </div>
  </div>
</main>

<script src="<c:url value='/static/lib/jquery.js' />"></script>
<script src="<c:url value='/static/lib/jquery-ui.js' />"></script>
<script src="<c:url value='/static/lib/angular.js' />"></script>
<script src="<c:url value='/static/lib/angular-route.js' />"></script>
<script src="<c:url value='/static/lib/angular-ui-router.js' />"></script>
<script src="<c:url value='/static/lib/ui-bootstrap-tpls.js' />"></script>
<script src="<c:url value='/static/lib/bootstrap.min.js' />"></script>
<script src="<c:url value='/static/lib/jquery.isotope.min.js' />"></script>
<script src="<c:url value='/static/lib/wow.min.js' />"></script>
<script src="<c:url value='/static/lib/xeditable.js' />"></script>
<script src="<c:url value='/static/lib/bootstrap-select.js' />"></script>
<script src="<c:url value='/static/lib/select.js' />"></script>
<script src="<c:url value='/static/lib/angular-sanitize.js' />"></script>
<script src="<c:url value='/static/lib/FileSaver.min.js' />"></script>
<script src="<c:url value='/static/lib/ngNotificationsBar.min.js' />"></script>
<script src="<c:url value='/static/lib/jquery-2.1.3.min.js' />"></script>
<script src="<c:url value='/static/lib/ng-bootstrap-submenu.min.js' />"></script>

<script src="<c:url value='/static/app/app.js' />"></script>
<script src="<c:url value='/static/app/pages/pages.module.js' />"></script>
<script src="<c:url value='/static/app/service/TestDataGenService.js' />"></script>
<script src="<c:url value='/static/app/service/fileUpload.js'/>"></script>
<script src="<c:url value='/static/app/service/LookUpService.js'/>"></script>
<script src="<c:url value='/static/app/pages/lookup/lookup.module.js' />"></script>
<script src="<c:url value='/static/app/controller/LookupCtrl.js' />"></script>
<script src="<c:url value='/static/app/controller/LookupViewCtrl.js' />"></script>
<script src="<c:url value='/static/app/controller/TestDataGenCtrl.js' />"></script>
<script src="<c:url value='/static/app/controller/fileUploadCtrl.js' />"></script>
<script src="<c:url value='/static/app/controller/dashboardCtrl.js' />"></script>
<%-- <script src="<c:url value='/static/app/pages/notificationConfig.js' />"></script> --%>
<script src="<c:url value='/static/app/theme/theme.config.js' />"></script>
<script src="<c:url value='/static/app/theme/components/components.module.js' />"></script>
<script src="<c:url value='/static/app/theme/components/pageTop/pageTop.directive.js' />"></script>
<script src="<c:url value='/static/app/directives/fileModel.js' />"></script>
<%-- <script src="<c:url value='/static/app/directives/confirm.js' />"></script> --%>
<script src="<c:url value='/static/app/theme/components/includeWithScope.js' />"></script>

</body>
</html>
