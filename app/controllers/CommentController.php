<?php
	include_once('Controller.php');
	class CommentController extends Controller
	{
		public function defaultAction()
		{
			$latestCommentsView = $this->obtainView("latestcomments");
			$model = $this->obtainModel("comment");
			
			$latestComments = $model->latest(3);
			
			$latestCommentsView->setContext(
				array('comments' => $latestComments));
				
			$latestCommentsView->render();
		}
	}
?>