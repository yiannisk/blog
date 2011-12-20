<?php
	include_once('config/db.php');

	class Model
	{
		protected $handle;
		
		public function __construct() 
		{ 
			$this->handle = new mysqli(HOST, USERNAME, PASSWORD, DB); 
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
		
		protected function scalar($statement)
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
			
			return ${$fields[0]->name};
		}
		
		protected function escapeString($val)
		{
			return $this->handle->real_escape_string($val);
		}
	}
?>
