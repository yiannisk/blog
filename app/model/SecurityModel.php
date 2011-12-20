<?php
	include_once('Model.php');
	
	class SecurityModel extends Model 
	{
		function getUserLevel($user, $pass)
		{
			$statement = parent::prepare('SELECT level FROM user WHERE '
				. 'username = ? AND password = ?');
			
			$statement->bind_param('ss', $user, $pass);
			return parent::scalar($statement);
		}
		
		function getActionLevel($action)
		{
			$statement = parent::prepare('SELECT level FROM level WHERE '
				. 'action = ?');
				
			$statement->bind_param('s', $action);
			return parent::scalar($statement);
		}
	}
?>