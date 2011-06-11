<?php
	include_once("Model.php");

	class StaticModel extends Model
	{
		function single($name)
		{
			$statement = parent::prepare(
				"SELECT * FROM static WHERE name = :name");
			$statement->bindValue(":name", $name);
			return parent::parseSingleResult($statement->execute());
		}
	}
?>