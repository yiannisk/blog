<?php
	include_once('Model.php');
	
	class CommentsModel extends Model
	{
		function latest($count, $entryid)
		{
			$statement = parent::prepare(
				'SELECT * FROM comment WHERE entryid = ?'
					. ' ORDER BY createdon DESC LIMIT ?');
			
			$statement->bind_param('ii', $entryid, $count);
			
			return parent::rows($statement);
		}
	}
?>