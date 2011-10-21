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
		
		protected function rows($statement)
		{
			$statement->execute();
			$metadata = $statement->result_metadata();
			$fields = $metadata->fetch_fields();
			
			$bindExpr = "";
			foreach($fields as $field)
				$bindExpr .= ",\${$field->name}";
				
			if (strlen($bindExpr) > 0)
				$bindExpr = substr($bindExpr, 1);
			
			eval('$statement->bind_result('.$bindExpr.');');

			$results = array();
			while($statement->fetch())
			{
				$result = array();
			
				foreach($fields as $field)
					$result[$field->name] = ${$field->name};
					
				$results[] = $result;
			}
			
			return $results;
		}
		
		protected function row($statement)
		{
			$statement->execute();
			$metadata = $statement->result_metadata();
			$fields = $metadata->fetch_fields();
			
			$bindExpr = "";
			foreach($fields as $field)
				$bindExpr .= ",\${$field->name}";
				
			if (strlen($bindExpr) > 0)
				$bindExpr = substr($bindExpr, 1);
			
			eval('$statement->bind_result('.$bindExpr.');');
			
			$statement->fetch();
			
			$result = array();
			foreach($fields as $field)
				$result[$field->name] = ${$field->name};
				
			return $result;
		}
		
		protected function escapeString($val)
		{
			return mysql_real_escape_string($val);
		}
	}
?>