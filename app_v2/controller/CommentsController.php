<?php
	include_once('Controller.php');
	include_once('config/db.php');
	include_once('model/CommentsModel.php');
	include_once('model/SecurityModel.php');
	
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
		
		public function create($req)
		{
			$userlevel = isset($_SESSION['userLevel'])
				? $_SESSION['userLevel']
				: 50; // public default.
			
			$securityModel = new SecurityModel();
			$createLevel = $securityModel->getActionLevel('comments/create');
			
			// check for adequately low user level.
			if ($userlevel > $createLevel) {
				echo "failure";
				return;
			}

			// check captcha trigger.
			if (!isset($_SESSION['canPostComment']) 
				 || !$_SESSION['canPostComment']) {
				echo "failure";
				return;
			}

			// check flood limit.
			$commentsModel = new CommentsModel();
			$lastCreatedOn = $commentsModel->lastCommentCreatedOn();
			if ($lastCreatedOn != null && time() - $lastCreatedOn < FLOOD_LIMIT) {
				echo "failure";
				return;
			}

			// sanitize inputs.
			$entryId = (int) isset($req->arguments['entryId']) 
				? $req->arguments['entryId']
				: 0;

			$author = 
				substr(isset($req->arguments['author'])
					? $req->arguments['author']
					: '', 0, 250);

			$contents = 
				isset($req->arguments['contents'])
					? $req->arguments['contents']
					: '';
			
			if ($entryId == 0 || strlen($author) == 0 || strlen($contents) == 0) {
				echo "failure";
				return;
			}
			
			ob_start();
			try {
				// perform insert query.
				$commentsModel->create($entryId, $author, $contents);
				echo "success";
			} catch (Exception $e) {
				echo $e;
				echo "failure";
			}
			ob_end_flush();
		}
	}
?>
