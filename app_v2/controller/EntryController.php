<?php
	include_once("Controller.php");
	include_once('model/EntryModel.php');
    include_once('config/defaults.php');
	
	class EntryController extends Controller {
		public function latest($req) {
			$latestLimit = isset($req->route->identifier)
				? intval($req->route->identifier) > 0
                        ? intval($req->route->identifier)
                        : LATEST_ENTRIES_COUNT
				: LATEST_ENTRIES_COUNT;

			$model = new EntryModel();
			$latestEntries = $model->latest($latestLimit);
			
			echo json_encode($latestEntries);
		}
		
		public function single($req) {
			$identifier = $req->route->identifier;
			$model = new EntryModel();
			$single = $model->single($identifier);
			
			echo json_encode($single);
		}
		
		public function search($req) {
			$term = $req->route->identifier;
			$model = new EntryModel();
			$results = $model->search($term);
			
			echo json_encode($results);
		}
		
		public function codes($req) {
			$model = new EntryModel();
			$results = $model->codes();

			$str = '';
			for($i = 0; $i < count($results); $i ++)
				$str .= "\n" . $results[$i]['code'];
			
			echo substr($str, 1);
		}
	}
?>
