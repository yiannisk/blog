<?php
	include_once("Controller.php");
	include_once("model/CommentsModel.php");
	
	class CommentsController extends Controller {
		public function latest($req)
		{
			$latestLimit = isset($req->arguments['p0'])
				? intval($req->arguments['p0'])
				: 3;
				
			$entryId = isset($req->route->identifier)
				? intval($req->route->identifier)
				: 0;

			$model = new CommentsModel();
			
			$latestComments = 
				$model->latest($entryId, $latestLimit);

			echo json_encode($latestComments);
		}
	}
?>