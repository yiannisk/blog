<?php
	class HttpParameters implements IHttpParameters
	{
		private $params, $item, $action;
	
		public function __construct()
		{
			$this->params = array();
		}
		
		/*** IHttpParameters implementation ***/
		public function getItem()
		{
			return isset($this->item) ? $this->item : false;
		}
		
		public function getAction()
		{
			return isset($this->action) ? $this->action : false;
		}
		
		public function getParams()
		{
			return isset($this->params) ? $this->params : false;
		}
		/*** IHttpParameters implementation ends ***/
		
		public static function current()
		{
			$result = new HttpParameters();
		
			$method = strtolower($_SERVER['REQUEST_METHOD']);
			$data = 
				($method == 'get')
					? $_GET
					: ($method == 'post')
						? $_POST
						: null;
			
			if ($data == null) return $result;
						
			foreach($data as $key => $value)
				if ($key == 'i')
					$item = $value;
				else if ($key == 'a')
					$action = $value;
				else
					$result->params[$key] = $value;
					
			return  $result;
		}
	}
?>