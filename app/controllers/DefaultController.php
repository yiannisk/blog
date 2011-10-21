<?php
	include_once("Controller.php");
	
	class DefaultController extends Controller
	{
		public function defaultAction()
		{
			echo 'Primo default action dispatched!';
		}
	}
?>