<?php
	function __Autoload($class) { include_once($class.".php"); }
	
	if (!SessionWrapper::Instance()->hasAccess()) 
		throw Exceptions::make(Exceptions::ACCESS_DENIED);
	
	class Page
	{
		private function __construct() {};
		
	}
?>