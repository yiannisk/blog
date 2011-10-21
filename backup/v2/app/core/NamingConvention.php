<?php
	class NamingConvention implements INamingConvention
	{
		/*** INamingConvention implementation ***/
		public function getControllerName($name)
		{
			return "{$name}Controller.php";
		}
		
		public function getViewName($name)
		{
			return "{$name}View.php";
		}
		
		public function getModelName($name)
		{
			return "{$name}Model.php";
		}
		
		public function getFileLocator()
		{
			return new CaseInsensitiveFileLocator();
		}
		
		public function getDefaultAction()
		{
			return 'defaultAction';
		}
		/*** INamingConvention implementation ends ***/
	}
?>