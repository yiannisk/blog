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
			// resolve the actual view file's location.
			$viewName = $this->convention->getViewName($name);
			$locator = $this->convention->getFileLocator();
			$locator->resolveLocation($viewName, $this->settings->getViewsLocation());
			$viewPath = $locator->getPath();
			
			include_once($this->settings->getViewsLocation() . "View.php");
			$view = new View($viewPath);
			return $view;
		}
		
		protected function obtainModel($name)
		{
			// resolve the actual model file's location.
			$modelName = $this->convention->getModelName($name);
			$locator = $this->convention->getFileLocator();
			$locator->resolveLocation($modelName, $this->settings->getModelsLocation());
			$modelPath = $locator->getPath();
			$modelActualName = $locator->getFileName();
			include_once($modelPath);
			return new $modelActualName($this->settings);
		}
	}
?>