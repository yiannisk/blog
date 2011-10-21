<?php
	include_once("Controller.php");
	include_once("model/StaticModel.php");
	
	class StaticController extends Controller {
		function single($req) {
			$staticName = isset($req->route->identifier)
				? $req->route->identifier
				: '';
					
			$model = new StaticModel();
			$singleResult = $model->single($staticName);
			
			echo json_encode($singleResult);
		}
	}
?>