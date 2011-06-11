<?php
	include_once("Controller.php");
	class SearchController extends Controller 
	{
		public function defaultAction() 
		{
			$searchView = $this->obtainView("search");
			$searchView->render();
		}
	}
?>