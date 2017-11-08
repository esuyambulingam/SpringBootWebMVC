<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>

<body>

<header id="header">

        <nav class="navbar navbar-inverse" role="banner" >
            <div class="container">
                <div class="navbar-header" style="width:100%; display:inline;">

                 <span > <img id="logo" class="pull-left" src="static/images/cognizant-logo.png"

                     alt="cognizantlogo" href="#" style="width:20%;margin-right:10%;" /></span>

                    <a class="navbar-brand" href="index.html">Sample Application V1</a>
                </div>

                <%-- <div class="collapse navbar-collapse navbar-right" style="display:inline;">
                    <ul class="nav navbar-nav">
                        <li class="dropdown active">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown">Data Template  <i class="fa fa-angle-down"></i></a>
                            <ul class="dropdown-menu">
                                <li><a href="#/lookupcreate">Create</a></li>
                                <li><a href="#/lookupview">View</a></li>
                            </ul>
                        </li>
                        <li class="active"><a href="#/testdatagen">Data Generation</a></li>

                        <li class="dropdown active">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown">File  <i class="fa fa-angle-down"></i></a>
                            <ul class="dropdown-menu">
								<li ><a href="#/fileupload">Upload</a></li>
                                <li ><a href="#/fileDetailsView">View</a></li>
                            </ul>
                        </li>

                        <li>
                        <form id="logout" action="logout" method="post" >
  							<input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />
						</form>
						<c:if test="${pageContext.request.userPrincipal.name != null}">
							<a href="javascript:document.getElementById('logout').submit()">Logout</a>
						</c:if>
                        </li>
                    </ul>
                </div> --%>
            </div><!--/.container-->
        </nav><!--/nav-->

    </header><!--/header-->


</body>
</html>
