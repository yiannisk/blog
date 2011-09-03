<?php
	function __Autoload($classname)
	{
		include_once('core/'.$classname.'.php');
	}
	
	$context = new ApplicationContext();
	
	$convention = new NamingConvention();
	$parameters = HttpParameters::current();
	$settings = ApplicationSettings::current();
	
	$context->initialize($parameters, $convention, $settings);
	$context->dispatch();
?>