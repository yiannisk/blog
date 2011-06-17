<?php
	class Model
	{
		protected $handle, $settings;
		
		public function __construct($settings) 
		{ 
			$this->settings = $settings; 
			
			$this->handle = new mysqli($settings->getHost(),
				$settings->getUserName(), $settings->getPassword(), 
				$settings->getDatabase()); 
		}
		
		public function prepare($query)
		{
			return $this->handle->prepare($query);
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
			while($row = $qhandle->fetch_array())
				$result[] = array_slice($row, 1);
			return $result;
		}
		
		protected function parseSingleResult($qhandle)
		{
			if ($row = $qhandle->fetch_array())
				return array_slice($row, 1);
			
			return array();
		}
	}
?>