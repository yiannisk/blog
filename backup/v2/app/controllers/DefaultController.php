<?php
	include_once("Controller.php");
	
	class DefaultController extends Controller
	{
		public function defaultAction()
		{
			echo "Default action dispatched!";
			var_dump($this->obtainView("sample"));
		}
	}
?>