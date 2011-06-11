<?php
	session_start();

	function islocal()
	{
		list($host, $port) = explode(':', $_SERVER['HTTP_HOST'], 2);
		$localhost = (strtolower($host) == "localhost");
		$islocalip = gethostbyname($host) == "127.0.0.1";
		return $localhost && $islocalip;
	}
	

	function iswhitelist()
	{
		$whitelist = array( 
			"localhost", 
			"kl1nt.blog.info" 
		);
			
		list($host, $port) = explode(':', $_SERVER['HTTP_HOST'], 2);
		return in_array(strtolower($host), $whitelist);
	}
	
	function isloggedin()
	{
		return isset($_SESSION['userid']) && ($_SESSION['userid'] != "");
	}
	
	// don't mess with the order here, 'cause it might screw performance,
	// especially the last atom which resolves the name into an IP.
	if ( !(isloggedin() || iswhitelist() || islocal()) ) 
		throw new Exception('Access Denied');
?>