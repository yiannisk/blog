<?php
	include_once("Model.php");

	class StaticModel extends Model
	{
		function single($name)
		{
			$statement = parent::prepare("SELECT * FROM static WHERE name = ?");
			$statement->bind_param("s", $name);
			
			return parent::row($statement);
		}
	}
?>