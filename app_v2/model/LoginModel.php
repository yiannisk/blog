<?php
	include_once('Model.php');
	
	class LoginModel extends Model 
	{
		function getUserLevel($user, $pass)
		{
			$statement = parent::prepare('SELECT level FROM user WHERE '
				. 'username = ? AND password = ?');
			
			$statement->bind_param('ss', $user, $pass);
			
			return parent::scalar($statement);
		}
	}
?>