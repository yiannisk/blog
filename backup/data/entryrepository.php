<?php
	include_once("../security/session.php");
	include_once("blogdatasource.php");

	class EntryRepository extends BlogDataSource
	{
		function latest($count)
		{
			$statement = parent::prepare("SELECT * FROM post ORDER BY createdon DESC LIMIT :count");
			$statement->bindValue(":count", $count);
			return parent::parseResults($statement->execute());
		}
	}
?>