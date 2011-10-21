<?php
	include_once("Controller.php");
	
	class SearchController extends Controller 
	{
		public function defaultAction() 
		{
			$searchView = $this->obtainView("search");
			$searchView->render();
		}
		
		public function search($params)
		{
			$term = $params["term"];
			$resultsView = $this->obtainView("searchResults");
			$model = $this->obtainModel("entry");
			$searchResults = $model->textsearch($term);
			$resultsView->setContext(array('entries' => $searchResults));
			$resultsView->render();
		}
	}
?>