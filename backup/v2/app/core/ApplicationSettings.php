<?php
	class ApplicationSettings
	{
		private $home = 'default';
		private $controllersLocation = 'app/controllers/';
		private $viewsLocation = 'app/views/';
		private $modelsLocation = 'app/models/';
		
		private function __construct() {}
		
		public final function getHomeController() { return $this->home; }
		public final function getControllersLocation() { return $this->controllersLocation; }
		public final function getViewsLocation() { return $this->viewsLocation; }
		public final function getModelsLocation() { return $this->modelsLocation; }
		
		public final static function current() 
		{
			static $_instance;
			
			if (!isset($_instance))
				$_instance = new ApplicationSettings();
				
			return $_instance;
		}
	}
?>