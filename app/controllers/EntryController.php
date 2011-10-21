<?php
	include_once("Controller.php");
	class EntryController extends Controller 
	{
		public function defaultAction() {}
		
		public function latest()
		{
			$latestEntriesView = $this->obtainView("latestentries");
			$model = $this->obtainModel("entry");
			
			$latestEntries = $model->latest(3);
			$latestEntriesView->setContext(array('entries' => $latestEntries));
			$latestEntriesView->render();
		}
	
		public function selected($params)
		{
			$selectedId = $params["id"];
		
			$entryView = $this->obtainView("entry");
			$model = $this->obtainModel("entry");
			
			$selected = $model->single( $selectedId );
			$entryView->setContext( $selected );
			$entryView->render();
		}
	}
?>