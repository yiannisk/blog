<?php
	class View
	{
		private $context, $viewPath;
		
		public function __construct($viewPath)
		{
			$this->viewPath = $viewPath;
		}
		
		public function getContext($context)
		{
			return isset($this->context) ? $this->context : false;
		}
		
		public function setContext($context)
		{
			$this->context = $context;
		}
		
		public function render()
		{
			// all this does is declare all passed keys as local variables
			// for ease of use.
			foreach($this->context as $key => $value)
				$$key = $value;
				
			// now include the view, allowing it to render as a
			// plain old PHP file.
			include_once($this->viewPath);
		}
		
		public function renderToString()
		{
			// create an output buffer, fill it and return it.
			ob_start();
			$this->render();
			return ob_get_clean();
		}
	}
?>