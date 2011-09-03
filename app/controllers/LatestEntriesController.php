<?php
	include_once("Controller.php");
	class LatestEntriesController extends Controller 
	{
		public function defaultAction()
		{
			$latestEntriesView = $this->obtainView("latestentries");
			$model = $this->obtainModel("entry");
			
			$latestEntries = $model->latest(3);
			$latestEntriesView->setContext(array('entries' => $latestEntries));
			$latestEntriesView->render();
		}
	}
?>