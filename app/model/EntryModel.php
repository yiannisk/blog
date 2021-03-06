<?php
	include_once('Model.php');

	class EntryModel extends Model
	{
		function single($id)
		{
			if (is_numeric($id)) {
				$statement = parent::prepare(
					'SELECT * FROM entry WHERE id = ?');
				$statement->bind_param('i', $id);
			} else {
				$statement = parent::prepare(
					'SELECT * FROM entry WHERE code = ?');
				$statement->bind_param('s', $id);
			}

			return parent::row($statement);
		}
	
		function latest($count)
		{
			$statement = parent::prepare(
				'SELECT * FROM entry ORDER BY createdon DESC LIMIT ?');

			$statement->bind_param('i', $count);
			
			return parent::rows($statement);
		}
		
		function all()
		{
			$statement = parent::prepare(
				'SELECT * FROM entry ORDER BY createdon DESC');

			return parent::rows($statement);
		}
		
		function codes()
		{
			$statement = parent::prepare('SELECT code FROM entry');
			return parent::rows($statement);
		}
		
		function search($term)
		{
			if (strlen($term) == 0) return array();
			
			if (strcmp($term, 'allposts') == 0) {
				return $this->all();
			}
			
			$statement = parent::prepare(
				'SELECT * FROM entry WHERE title LIKE ? '.
				'	OR preview LIKE ? OR contents LIKE ?'.
				'	OR subtitle LIKE ?');
				
			$sanitizedTerm = 
				'%' . parent::escapeString($term) . '%';
				
			$statement->bind_param('ssss', $sanitizedTerm, $sanitizedTerm, 
				$sanitizedTerm, $sanitizedTerm);
			
			return parent::rows($statement);
		}
	}
?>
