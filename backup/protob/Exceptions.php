<?php
	class Exceptions 
	{
		const ACCESS_DENIED = 'Access Denied';
		
		public static function make($exception) 
		{
			return new Exception($exception);
		}
	}
?>