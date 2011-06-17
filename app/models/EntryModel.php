<?php
	include_once('Model.php');

	class EntryModel extends Model
	{
		function single($id)
		{
			$statement = parent::prepare('SELECT * FROM entry WHERE id = ?');
			$statement->bind_param('i', $id);
			return parent::row($statement);
		}
	
		function latest($count)
		{
			$statement = parent::prepare(
				'SELECT * FROM entry ORDER BY createdon DESC LIMIT ?');
			$statement->bind_param('i', $count);
			
			return parent::rows($statement);
		}
		
		function textsearch($term)
		{
			$statement = parent::prepare(
				'SELECT * FROM entry WHERE title LIKE ? '.
				'	OR preview LIKE ? OR contents LIKE ?'.
				'	OR subtitle LIKE ?');
				
			$sanitizedTerm = 
				'%' . parent::real_escape_string($term) . '%';
			
			for($i = 0; $i < 4; $i++)
				$statement->bind_param('s', $sanitizedTerm);
			
			return parent::rows($statement);
		}
	}
?>