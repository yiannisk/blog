<?php
	class Route {
		private $item, $action, $identifier, 
			$controller, $selectedAction;
		
		public function __construct($item, $action, $identifier) {
			$this->item = $item;
			$this->action = $action;
			$this->identifier = $identifier;
		}
		
		public function loadController($default) {
			$locator = new CaseInsensitiveFileLocator();
			
			if ($locator->resolveLocation($this->item, 'controller/'))
			{
				include_once($locator->getPath());
				$name = $locator->getFileName();
				return new $name(); 
			}
			
			$locator->resolveLocation($default, 'controller/');
			var_dump($default);
			include_once($locator->getPath(''));
			$name = $locator->getFileName('');
			$this->controller = new $name(); 
			
			return $this->controller;
		}
		
		public function setAction($default) {
			$this->selectedAction =
				(isset($this->action) 
				  && method_exists($this->controller, $this->action))
					? $this->action
					: $default;
					
			return $this->selectedAction;
		}
		
		public function dispatch($request) {
			$this->controller->{$this->selectedAction}($request);
		}
	}
?>