<?php
	class Model extends SQLite3
	{
		protected $handle, $settings;
		
		
		public function __construct($settings) 
		{ 
			$this->settings = $settings; 
			$this->handle = $this->open($this->settings->getDataSourceLocation()); 
		}
		
		public function __destruct() 
		{
			if(isset($this->handle) && $this->handle != null) 
			{
				$this->handle->close();
				$this->handle = null;
			}
		}
		
		protected function parseResults($qhandle)
		{
			$result = array();
			while($row = $qhandle->fetchArray())
				$result[] = array_slice($row, 1);
			return $result;
		}
		
		protected function parseSingleResult($qhandle)
		{
			if ($row = $qhandle->fetchArray())
				return array_slice($row, 1);
			
			return array();
		}
	}
?>