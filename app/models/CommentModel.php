<?php
	include_once('Model.php');
	
	class CommentModel extends Model
	{
		function latest($count)
		{
			$statement = parent::prepare(
				'SELECT * FROM Comment ORDER BY CreatedOn DESC LIMIT ?');
			
			$statement->bind_param('i', $count);
			
			return parent::rows($statement);
		}
	}
?>