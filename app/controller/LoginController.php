<?php
	include_once('Controller.php');
	include_once('model/SecurityModel.php');
	
	class LoginController extends Controller {
		public function login($req) {
			$username = $req->arguments['username'];
			$password = $req->arguments['password'];
			
			$securityModel = new SecurityModel();
			
			$hash = base64_encode(sha1($password."kl1nt", true));
			$userLevel = $securityModel->getUserLevel($username, $hash);
			
			$_SESSION['userLevel'] = $userLevel;
		}
	}
?>