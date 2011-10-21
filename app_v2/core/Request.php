<?php
	class Request {
		public $url, $method, $arguments, $accept, $route;
		
		public function __construct(
			$url, $method, $arguments, $accept, $route) {
				
			$this->url = $url;
			$this->method = $method;
			$this->arguments = $arguments;
			$this->accept = $accept;
			$this->route = $route;
		}
	}
?>