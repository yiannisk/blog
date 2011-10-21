<?php
	include_once("../security/session.php");
	
	// Auto - load all viable members here.
	// We 're going to limit ourselves to this folder.
	function __autoload($class_name) {
		include $class_name . '.php';
	}
	
	class HttpParams
	{
		public $params;
	
		public function __construct()
		{
			$this->params = array();
		}
	
		// placeholder - should be used to validate 
		// parameter key - value pairs.
		public static function validate($name, $value)
		{
			return true;
		}
		
		// placeholder - should be used to validate
		// the set of parameters.
		public static function isValidParamSet($httpParams)
		{
			return true;
		}
	
		public static function create()
		{
			var result = new HttpParams();
		
			$method = strtolower($_SERVER['REQUEST_METHOD']);
			$data = 
				($ds->method == 'get')
					? $_GET
					: ($ds->method == 'post')
						? $_POST
						: null;
			
			if ($data == null) return result;
						
			foreach($data as $key => $value)
				if (validate($key, $value))
					$result->params[$key] = $value;
					
			return  (isValidParamSet($result)) ? $result : new HttpParams();
		}
	}
	
	
	class DataService 
	{
		protected $repos, $method, $data;
	
		function __construct()
		{
			$this->repos = array();
			$this->repos["entries"] = new EntryRepository();
		}
		
		function __destruct()
		{
			$this->repos = null;
		}
		
		function setData($data)
		{
			
		}
		
		public static function processRequest()
		{
			$ds = new DataService();
			
		}
	}
	
	$repo = new EntryRepository();
	var_dump($repo->latest(1));
?>