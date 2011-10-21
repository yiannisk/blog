<?php
	include_once("../security/session.php");
	
	class BlogDataSource extends SQLite3
	{
		protected $handle;
		
		function __construct() { $this->handle = $this->open('blog.sqlite'); }
		
		function __destruct() 
		{
			if($this->handle) 
			{
				$this->handle->close();
				$this->handle = NULL;
			}
		}
		
		function parseResults($qhandle)
		{
			while($row = $qhandle->fetchArray())
				$result[] = array_slice($row, 1);
				
			return $result;
		}
	}
?>