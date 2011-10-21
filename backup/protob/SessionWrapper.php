<?php
	function __Autoload($class) { include_once($class.".php"); }

	class SessionWrapper 
	{
		protected static $instance = NULL;
		
		final private function __construct() { session_start(); }
		final private function __clone() {}
		
		final public static function Instance()
		{
			if (!isset(static::$instance))
				static::$instance = new static();
				
			return static::$instance;
		}
		
		public function hasAccess()
		{
			// TODO: Implement this.
			return true;
		}
		
		public function abandon()
		{
			session_destroy();
		}
	}
?>