<?php
	include('Controller.php');
	
	class TestController extends Controller {
		public function retrieve($req) {
			echo "Retrieve invoked.<br />";
		}
		
		public function create($req) {
			echo "Create invoked.<br />";
		}
	}
?>