<?php
	session_start();
	$_SESSION['userLevel'] = 50; // public.
	$_SESSION['canPostComment'] = false;
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8" />
	<title>Ioannis Karadimas' Blog</title>
	
	<link rel="stylesheet" type="text/css" href="styles/base.css" />
	<link rel="stylesheet" type="text/css" 
		href='styles/external/jquery-ui-1.8.13.custom.css' />
		
	<!-- handle CSS compatibility issues below -->
	<!--[if IE]>
		<script src="scripts/external/html5-shiv-ie.js"></script>
	<![endif]-->
	
	<!-- Fonts -->
	<link href='http://fonts.googleapis.com/css?family=Philosopher' 
		rel='stylesheet' type='text/css' />
		
	<link rel="stylesheet" type="text/css" 
		href='styles/external/colorbox.css' />
</head>
<body id="home">

	<div id="header"></div>
	<div id="layout">
		<div id="logo"></div>
		<div id="leftPart">
			<div id="leftPartContents"></div>
		</div>
		<div id="rightPart">
			<div id="bioSide"></div>
			<div id="search"></div>
			<div id="comments"></div>
		</div>
		
		<div id="bio"></div>
	</div>
	
	<script type="text/javascript" 
		src="http://code.jquery.com/jquery-latest.min.js"></script>
	<script type="text/javascript" 
		src="scripts/external/jquery.color.js"></script>
	<script type="text/javascript" 
		src="scripts/windowExtensions.js"></script>
	<script type="text/javascript" 
		src="scripts/external/jquery.tmpl.min.js"></script>
	<script type="text/javascript" 
		src="scripts/external/jquery-ui-1.8.13.custom.min.js"></script>
	<script type="text/javascript" 
		src="scripts/external/jquery.snippet.min.js"></script>
	<script type="text/javascript" 
		src="scripts/external/jquery.json-2.2.min.js"></script>
	<script type="text/javascript" 
		src="scripts/external/jquery.colorbox-min.js"></script>
	<script type="text/javascript" 
		src="scripts/external/jquery.ba-hashchange.min.js"></script>
	<script type="text/javascript" 
		src="scripts/external/date.format.js"></script>
	<script type="text/javascript" 
		src="scripts/jquery.tmpl.unixdate.js"></script>
	<script type="text/javascript" src="scripts/dynamic.js"></script>
	<script type="text/javascript" src="scripts/join.js"></script>
	<script type="text/javascript" src="scripts/layout.js"></script>
	<script type="text/javascript" src="scripts/markdown.js"></script>
	<script type="text/javascript" src="scripts/template.js"></script>
	<script type="text/javascript" src="scripts/router.js"></script>
	
	<!-- Views -->
	<script type="text/javascript" src="views/view.js"></script>
	<script type="text/javascript" src="views/postlistview.js"></script>
	<script type="text/javascript" src="views/headerview.js"></script>
	<script type="text/javascript" src="views/postview.js"></script>
	<script type="text/javascript" src="views/searchview.js"></script>
	<script type="text/javascript" src="views/commentsview.js"></script>
	<script type="text/javascript" src="views/bioview.js"></script>
	
	<script type="text/javascript">
		var layout = {};
		
		$(function () {
			window.layout = new Layout();
			window.router = new Router();
			
			layout.draw(new HeaderView(), "header");
			layout.draw(new SearchView(), "search");
			layout.draw(new BioView(), "bio");
			layout.hash();
			
			router.initialize();
		});
	</script>
</body>
</html>