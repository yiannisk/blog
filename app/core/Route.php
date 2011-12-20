<?php
	class Route {
		private $controller, $selectedAction;
		public $item, $action, $identifier;
		
		public function __construct($item, $action, $identifier) {
			$this->item = $item;
			$this->action = $action;
			$this->identifier = $identifier;
		}
		
		public function loadController($default) {
			$locator = new CaseInsensitiveFileLocator();
			
			if (!$locator->resolveLocation(
				$this->item.'controller.php', 'controller/'))
				$locator->resolveLocation($default, 'controller/');
				
			include_once($locator->getPath(''));
			$name = $locator->getFileName('');
			$this->controller = new $name();
			return $this->controller;
		}
		
		public function setAction($action) {
			$this->action = $action;
		}
		
		public function loadAction($default) {
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