<?php
	include_once('Controller.php');
	class CommentController extends Controller
	{
		public function defaultAction() {}
		
		public function latest($params)
		{
			$latestCommentsView = $this->obtainView("latestcomments");
			$model = $this->obtainModel("comment");
			
			$latestComments = 
				$model->latest($params['count'], $params['entryid']);
			
			$latestCommentsView->setContext(
				array('comments' => $latestComments));
				
			$latestCommentsView->render();
		}
	}
?>