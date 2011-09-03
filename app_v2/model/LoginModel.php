<?php
	include_once('Model.php');
	
	class LoginModel extends Model 
	{
		function getUserLevel($user, $pass)
		{
			$statement = parent::prepare('SELECT Level FROM user WHERE '
				. 'Username = ? AND Password = ?');
			
			$statement->bind_param('ss', $user, $pass);
			
			return parent::scalar($statement);
		}
	}
?>