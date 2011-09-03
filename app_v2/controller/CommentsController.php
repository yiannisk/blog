<?php
	include_once("Controller.php");
	include_once("model/CommentsModel.php");
	
	class CommentsController extends Controller {
		public function latest($req)
		{
			$entryId = isset($req->route->identifier)
				? intval($req->route->identifier)
				: 0;

			$latestLimit = isset($req->arguments['p0'])
				? intval($req->arguments['p0']) > 0
					? intval($req->arguments['p0'])
					: 3
				: 3;
				
			$model = new CommentsModel();
			
			$latestComments = 
				$model->latest($latestLimit, $entryId);

			echo json_encode($latestComments);
		}
	}
?>