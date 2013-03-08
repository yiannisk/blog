<?php
	session_start();
	$_SESSION['userLevel'] = 50; // public.
	$_SESSION['canPostComment'] = false;
	
	if (isset($_REQUEST['_escaped_fragment_'])) {
		$escapedFragment = $_REQUEST['_escaped_fragment_'];

		if (strlen($escapedFragment) == 0) {
			include("static/home.html");
			die();
		}
		
		if ($escapedFragment == "profile") {
			include("static/profile.html");
			die();
		}
		
		if (stristr($escapedFragment, "post.") !== FALSE) {
			$postUrl = str_replace('post.', '', $escapedFragment);
			include("static/$postUrl.html");
			die();
		}
	}
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8" />
	<title>Ioannis Karadimas' Blog</title>
	
	<link rel="stylesheet" type="text/css" href="styles/base.css" />
	<link rel="stylesheet" type="text/css" 
		href='styles/external/jquery-ui-1.8.22.custom.css' />
		
	<!-- handle CSS compatibility issues below -->
	<!--[if IE]>
		<script src="scripts/external/html5-shiv-ie.js"></script>
	<![endif]-->
	
	<!-- Fonts -->
	<link href='http://fonts.googleapis.com/css?family=Philosopher:400,700,400italic,700italic' 
		rel='stylesheet' type='text/css'>

    <!-- other stuff -->
	<link rel="stylesheet" type="text/css" href='styles/external/colorbox.css' />
	<link type="text/css" href="styles/external/jquery.jscrollpane.css" rel="stylesheet" media="all" />

    <!-- overrides -->
    <link rel="stylesheet" type="text/css" href="styles/overrides.css" />
</head>
<body id="home">

	<div id="header"></div>
	<div id="layout">
		<div id="logo"></div>
		<div id="leftPart">
			<div id="leftPartContents"></div>
		</div>
		<div id="rightPart">
			<div id="adminSide"></div>
			<div id="bioSide"></div>
			<div id="search"></div>
			<div id="comments"></div>
		</div>
		
		<div id="bio"></div>
	</div>
	<div id="footer">
		<div id="twitter">
			<img src="resources/twitter-bird-dark-bgs.png" 
				class="footerSectionLogo" alt="My latest tweets" />
			<div id="twitter_update_list"></div>
		</div>
		<div id="github">
			<img src="resources/github-white-logo.png"
				class="footerSectionLogo" 
				alt="My latest repo activity" />
			<div id="github_repos"></div>
		</div>
		<div id="stack_overflow">
			<img src="resources/stackoverflow.png"
				class="footerSectionLogo" 
				alt="My profile on StackOverflow" />
			<div id="stack_overflow_profile"></div>
		</div>
	</div>
    <script type="text/javascript" src="http://twitter.com/javascripts/blogger.js"></script>
    <script type="text/javascript" src="http://api.twitter.com/1/statuses/user_timeline/ikaradimas.json?callback=twitterCallback2&count=8"></script>
	<script type="text/javascript" 
		src="http://code.jquery.com/jquery-latest.min.js"></script>
	<script type="text/javascript" 
		src="scripts/external/jquery.color.js"></script>
	<script type="text/javascript" 
		src="scripts/windowExtensions.js"></script>
	<script type="text/javascript" 
		src="scripts/external/jquery.tmpl.min.js"></script>
	<script type="text/javascript" 
		src="scripts/external/jquery-ui-1.8.22.custom.min.js"></script>
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
	<script type="text/javascript" src="scripts/external/jquery.mousewheel.js"></script>
	<script type="text/javascript" src="scripts/external/jquery.jscrollpane.min.js"></script>
	
	<!-- Views -->
	<script type="text/javascript" src="views/view.js"></script>
	<script type="text/javascript" src="views/postlistview.js"></script>
	<script type="text/javascript" src="views/headerview.js"></script>
	<script type="text/javascript" src="views/postview.js"></script>
	<script type="text/javascript" src="views/searchview.js"></script>
	<script type="text/javascript" src="views/commentsview.js"></script>
	<script type="text/javascript" src="views/bioview.js"></script>
	<script type="text/javascript" src="views/adminview.js"></script>
	<script type="text/javascript" src="views/githubview.js"></script>
	<script type="text/javascript" src="views/soview.js"></script>
	<script type="text/javascript" src="views/toolsview.js"></script>
	
	<!-- Models -->
	<script type="text/javascript" src="models/model.js"></script>
	<script type="text/javascript" src="models/staticmodel.js"></script>
	<script type="text/javascript" src="models/entrymodel.js"></script>
	<script type="text/javascript" src="models/commentmodel.js">
		</script>
	<script type="text/javascript" src="models/mathmodel.js"></script>
	<script type="text/javascript" src="models/githubmodel.js"></script>
	<script type="text/javascript" src="models/somodel.js"></script>

	<script type="text/javascript">
		var layout = {};
		
		$(function () {
			window.layout = new Layout();
			window.router = new Router();
			
			layout.draw(new HeaderView(), "header");
			layout.draw(new SearchView(), "search");
            layout.draw(new BioView(), "bio");
			layout.draw(new AdminView(), "adminSide");
			layout.draw(new GitHubView(), "github_repos");
			
			layout.draw(new StackOverflowView(), 
				"stack_overflow_profile");
				
            layout.draw(new ToolsView(), "tools");
            
            router.initialize();    
            
            // other stuff / patches...
            $("#twitter").jScrollPane();
		});
	</script>
</body>
</html>
