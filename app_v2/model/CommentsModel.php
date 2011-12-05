<?php
	include_once('Model.php');
	
	class CommentsModel extends Model
	{
		function latest($count, $entryid)
		{
			if (is_numeric($entryid))
			{
				$statement = parent::prepare(
					'SELECT * FROM comment WHERE entryid = ?'
						. ' ORDER BY createdon DESC LIMIT ?');
				
				$statement->bind_param('ii', $entryid, $count);
			} else {
				$statement = parent::prepare(
					'SELECT * FROM comment WHERE entryid = '
						. '(SELECT id FROM entry WHERE code = ? '
						. ' LIMIT 1) ORDER BY createdon DESC LIMIT ?');
				
				$statement->bind_param('si', $entryid, $count);
			}
			
			return parent::rows($statement);
		}


		public function lastCommentCreatedOn() {
			$statement = parent::prepare(
				'SELECT max(CreatedOn) as LastCreatedOn FROM comment');

			return parent::scalar($statement);
		}

		public function create($entryid, $author, $contents) {
			if (is_numeric($entryid)) {
				$statement = parent::prepare(
					'INSERT INTO comment (entryid, author, contents, '
						. 'createdon) VALUES (?, ?, ?, ?)');

				$statement->bind_param('issi', 
					parent::escapeString($entryid), 
					parent::escapeString($author), 
					parent::escapeString($contents), 
					time());
			} else {
				$statement = parent::prepare(
					'INSERT INTO comment (entryid, author, contents, '
						. 'createdon) VALUES ((SELECT id FROM entry '
						. ' WHERE code = ? LIMIT 1), ?, ?, ?)');

				$statement->bind_param('sssi', 
					parent::escapeString($entryid), 
					parent::escapeString($author), 
					parent::escapeString($contents), 
					time());
			}
			

			$statement->execute();
		}
	}
?>
