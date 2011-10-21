<?php
	abstract class Controller
	{
		protected $convention, $settings;
	
		public function __construct($convention, $settings)
		{
			if (!$convention instanceof INamingConvention)
				throw new Exception('Invalid type: Convention is not INamingConvention');
			
			if (!$settings instanceof ApplicationSettings)
				throw new Exception('Invalid type: Settings is not ApplicationSettings');
			
			$this->convention = $convention;
			$this->settings = $settings;
		}
		
		public abstract function defaultAction();
		
		protected function obtainView($name)
		{
			$viewName = $this->convention->getViewName($name);
			$locator = $this->convention->getFileLocator();
			$locator->resolveLocation($viewName, $this->settings->getViewsLocation());
			include_once($locator->getPath());
			$viewCaseSensitiveName = $locator->getFileName();
			$view = new $viewCaseSensitiveName();
			return $view;
		}
		
		protected function obtainModel()
		{
		}
	}
?>