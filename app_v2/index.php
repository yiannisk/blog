<?php
	function __Autoload($classname)
	{
		include_once('core/'.$classname.'.php');
	}
	
	$service = new BlogRestService();
	$service->handleRawRequest($_SERVER, $_GET, $_POST);
?>