<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Test Data Generation</title>

  <link href="<c:url value='/static/css/main.css' />" rel="stylesheet" />
  <link href="<c:url value='/static/css/style.css' />" rel="stylesheet" />

</head>
<body>

    <header id="header">

        <nav class="navbar navbar-inverse" role="banner" >
            <div class="container" align="center">
                <div class="navbar-header">
                    <a class="navbar-brand">Test Data Generation</a>
                </div>
            </div>
        </nav>

    </header>


<!-- <div class="rerun"><a href="">Test Data Generation</a></div> -->
<div class="container">
  <div class="card"></div>
  <div class="card">
    <h1 class="title">Login</h1>
    <form name="f" action="login" method="post">
	  <div class="input-container" style="color: #ed2553">
	  <c:if test="${error != null}">
		${error}
	  </c:if>
	  </div>
	  <div class="input-container" style="color: #20a043">
	  <c:if test="${logoutMsg != null}">
		${logoutMsg}
	  </c:if>
	  </div>
      <div class="input-container">
        <input type="text" id="username" name="username" required="required"/>
        <label for="userName">Username</label>
        <div class="bar"></div>
      </div>
      <div class="input-container">
        <input type="password" id="password" name="password" required="required" autocomplete="off"/>
        <label for="userPass">Password</label>
        <div class="bar"></div>
      </div>
      <div class="button-container">
        <button type="submit"><span>Submit</span></button>
      </div>
      <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}"/>
    </form>
  </div>
  <div class="card alt">
    <div class="toggle" style="background-image: url('static/images/cognizant_logo.png');background-repeat: no-repeat;background-position: center;"></div>

  </div>
</div>

</body>
</html>