<?php
	function __Autoload($classname)
	{
		include_once('core/'.$classname.'.php');
	}
	
	session_start();
	
	$service = new BlogRestService();
	$service->handleRawRequest($_SERVER, $_GET, $_POST);
?>