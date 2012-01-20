<?php
	include_once('Controller.php');
	include_once('config/db.php');
	include_once('model/CommentModel.php');
	include_once('model/SecurityModel.php');
	
	class CommentController extends Controller {
		public function latest($req)
		{
			$entryId = $req->route->identifier;

			$latestLimit = isset($req->arguments['p0'])
				? intval($req->arguments['p0']) > 0
                        ? intval($req->arguments['p0'])
                        : LATEST_ENTRIES_COUNT
				: LATEST_ENTRIES_COUNT;
				
							$model = new CommentModel();
			
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
			$createLevel = 
				$securityModel->getActionLevel('comments/create');
			
			// check for adequately low user level.
			if ($userlevel > $createLevel) {
				echo "failure - inadequate user level";
				return;
			}

			// check captcha trigger.
			if (!isset($_SESSION['canPostComment']) 
				 || !$_SESSION['canPostComment']) {
				echo "failure - captcha trigger";
				return;
			}

			// check flood limit.
			$commentsModel = new CommentModel();
			$lastCreatedOn = $commentsModel->lastCommentCreatedOn();
			if ($lastCreatedOn != null && time() - $lastCreatedOn 
				< FLOOD_LIMIT) {
					echo "failure - flood limit";
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
			
			if (!isset($entryId) || strlen($author) == 0 
				|| strlen($contents) == 0) {
					echo "failure - insufficient data.";
					return;
			}
			
			try {
				// perform insert query.
				$commentsModel->create($entryId, $author, $contents);
				echo "success";
			} catch (Exception $e) {
				echo "failure - " . $e->getMessage();
			}
		}
	}
?>
