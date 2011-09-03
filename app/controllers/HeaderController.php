<?php
	include_once("Controller.php");
	
	class HeaderController extends Controller
	{
		public function defaultAction()
		{
			$headerView = $this->obtainView('header');
			$model = $this->obtainModel('static');
			
			$headerText = $model->single('header');
			$headerView->setContext( $headerText );
			$headerView->render();
		}
	}
?>