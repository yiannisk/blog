<?php
	session_start();
	$_SESSION['userLevel'] = 50; // public.
	$_SESSION['canPostComment'] = false;
?>

<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<title>Ioannis Karadimas' Blog - v10.0.1</title>
		<script type="text/javascript" 
			src="scripts/jquery/jquery-1.7.1.js"></script>
		<script type="text/javascript"
			src="scripts/async/async.js"></script>
		<script type="text/javascript" src="app.js"></script>
	</head>
	<body>
		<div id="#blog">
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
		</div>
	</body>
</html>
