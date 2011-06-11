<?php
	class ApplicationSettings
	{
		private $home = 'Default';
		private $controllersLocation = 'controllers/';
		private $viewsLocation = 'views/';
		private $modelsLocation = 'models/';
		private $dataSourceLocation = 'models/data/blog.sqlite';
		
		private function __construct() {}
		
		public final function getHomeController() { return $this->home; }
		public final function getControllersLocation() { return $this->controllersLocation; }
		public final function getViewsLocation() { return $this->viewsLocation; }
		public final function getModelsLocation() { return $this->modelsLocation; }
		public final function getDataSourceLocation() { return $this->dataSourceLocation; }
		
		public final static function current() 
		{
			static $_instance;
			
			if (!isset($_instance))
				$_instance = new ApplicationSettings();
				
			return $_instance;
		}
	}
?>