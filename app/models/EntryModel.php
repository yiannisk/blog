<?php
	include_once("Model.php");

	class EntryModel extends Model
	{
		function single($id)
		{
			$statement = parent::prepare(
					"SELECT * FROM entry WHERE id = :id");
				$statement->bindValue(":id", $id);
				return parent::parseSingleResult($statement->execute());
		}
	
		function latest($count)
		{
			$statement = parent::prepare(
				"SELECT * FROM entry ORDER BY createdon DESC LIMIT :count");
			$statement->bindValue(":count", $count);
			return parent::parseResults($statement->execute());
		}
	}
?>