<?php
	include_once('Controller.php');
	include_once('model/LoginModel.php');
	
	class LoginController extends Controller {
		public function login($req) {
			$username = $req->arguments['username'];
			$password = $req->arguments['password'];
			
			$loginModel = new LoginModel();
			
			$hash = base64_encode(sha1($password."kl1nt", true));
			$userLevel = $loginModel->getUserLevel($username, $hash);
			
			$_SESSION['userLevel'] = $userLevel;
		}
	}
?>