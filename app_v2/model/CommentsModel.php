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


		public function lastCommentCreatedOn() {
			$statement = parent::prepare(
				'SELECT max(CreatedOn) as LastCreatedOn FROM comment');

			return parent::scalar($statement);
		}

		public function create($entryid, $author, $contents) {
			$statement = parent::prepare(
				'INSERT INTO comment (entryid, author, contents, createdon) '
					. 'VALUES (?, ?, ?, ?)');

			$statement->bind_param('issi', $entryid, $author, 
				$contents, time());

			$statement->execute();
		}
	}
?>