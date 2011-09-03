<?php
	include_once('Model.php');
	
	class CommentModel extends Model
	{
		function latest($count, $entryid)
		{
			$statement = parent::prepare(
				'SELECT * FROM Comment WHERE EntryId = ?'
					. ' ORDER BY CreatedOn DESC LIMIT ?');
			
			$statement->bind_param('ii', $entryid, $count);
			
			return parent::rows($statement);
		}
	}
?>