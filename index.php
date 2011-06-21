<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8" />
	<title>Ioannis Karadimas' Blog</title>
	
	<link rel="stylesheet" type="text/css" href="styles/base.css" />
	<link rel="stylesheet" type="text/css" href='styles/external/jquery-ui-1.8.13.custom.css' />
	<!-- handle CSS compatibility issues below -->
	<!--[if IE]>
		<script src="http://html5shiv.googlecode.com/svn/trunk/html5.js">
		</script>
	<![endif]-->
	
	<!-- Fonts -->
	<!--link href='http://fonts.googleapis.com/css?family=Arimo:regular,italic,bold,bolditalic' rel='stylesheet' type='text/css'-->
	<link href='http://fonts.googleapis.com/css?family=Philosopher' rel='stylesheet' type='text/css' />
	<!--link href='http://fonts.googleapis.com/css?family=Cabin' rel='stylesheet' type='text/css'-->
</head>
<body id="home">

	<div id="header"></div>
	<div id="layout">
		<div id="logo"></div>
		<div id="leftPart">
			<div id="leftPartContents"></div>
		</div>
		<div id="rightPart">
			<div id="search"></div>
			<div id="comments"></div>
		</div>
	</div>
	
	<script type="text/javascript" src="scripts/external/jquery-1.5.min.js"></script>
	<script type="text/javascript" src="scripts/external/jquery-ui-1.8.13.custom.min.js"></script>
	<script type="text/javascript" src="scripts/external/jquery.syntaxhighlighter.min.js"></script>
	<!--script type="text/javascript" src="scripts/external/jquery.color.min.js"></script-->
	<script type="text/javascript" src="scripts/jquery.json-2.2.min.js"></script>
    <script type="text/javascript" src="scripts/debug.js"></script>	
	<script type="text/javascript" src="scripts/dynamic.js"></script>
	<script type="text/javascript" src="scripts/layout.js"></script>
	<script type="text/javascript" src="scripts/view.js"></script>
	<script type="text/javascript" src="scripts/view.postlist.js"></script>
	<script type="text/javascript" src="scripts/view.header.js"></script>
	<script type="text/javascript" src="scripts/view.post.js"></script>
	<script type="text/javascript" src="scripts/view.search.js"></script>
	<script type="text/javascript" src="scripts/view.comments.js"></script>
	<script type="text/javascript">
		var layout = {};
		$(function () {
			//ik.debug.start();
			layout = ik.layout.make();
			layout.draw(ik.view.postList.make(), "leftPartContents", 
				function () { console.log("Testing view enter callback..."); });
			layout.draw(ik.view.header.make(), "header");
			layout.draw(ik.view.search.make(), "search");
		});
	</script>
</body>
</html>