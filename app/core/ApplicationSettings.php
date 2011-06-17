<?php
	class ApplicationSettings
	{
		private $home = 'Default';
		private $controllersLocation = 'controllers/';
		private $viewsLocation = 'views/';
		private $modelsLocation = 'models/';
		
		private $database = 'blog';
		private $host = 'localhost';
		private $username = 'root';
		private $password = '';
		
		private function __construct() {}
		
		public final function getHomeController() { return $this->home; }
		public final function getControllersLocation() { return $this->controllersLocation; }
		public final function getViewsLocation() { return $this->viewsLocation; }
		public final function getModelsLocation() { return $this->modelsLocation; }
		
		public final function getDatabase() { return $this->database; }
		public final function getHost() { return $this->host; }
		public final function getUserName() { return $this->username; }
		public final function getPassword() { return $this->password; }
		
		public final static function current() 
		{
			static $_instance;
			
			if (!isset($_instance))
				$_instance = new ApplicationSettings();
				
			return $_instance;
		}
	}
?>