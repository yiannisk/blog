<?php
	include_once("restservice.php");

	class BlogRestService extends RestService {
		
		private $statusHeaders = array(
			"Ok" => "HTTP/1.1 200 OK",
			"Created" => "HTTP/1.1 201 Created",
			"Accepted" => "HTTP/1.1 202 Accepted",
			"NoContent" => "HTTP/1.1 204 No Content",
			"Found" => "HTTP/1.1 302 Found",
			"NotModified" => "HTTP/1.1 304 Not Modified",
			"BadRequest" => "HTTP/1.1 400 Bad Request",
			"Unauthorized" => "HTTP/1.1 401 Unauthorized",
			"Forbidden" => "HTTP/1.1 402 Forbidden",
			"NotFound" => "HTTP/1.1 404 Not Found",
			"MethodNotAllowed" => "HTTP/1.1 405 Not Allowed",
		);
		
		private $route;
		
		public function __construct() {
			parent::__construct("GET,POST,PUT,DELETE");
		}
		
		public function handleRawRequest($_SERVER, $_GET, $_POST) {
			$url = $this->getFullUrl($_SERVER);
			$method = $_SERVER['REQUEST_METHOD'];
			
			$this->route = array();
			$this->route['item'] = isset($_GET['item']) ? $_GET['item'] : '';
			$this->route['action'] = 
				isset($_GET['action']) ? $_GET['action'] : '';
			$this->route['id'] = isset($_GET['id']) ? $_GET['id'] : '';

			$arguments = array();
			
			switch ($method) {
				case 'GET':
					$arguments['p0'] = isset($_GET['p0']) ? $_GET['p0'] : '';
					$arguments['p1'] = isset($_GET['p1']) ? $_GET['p1'] : '';
					$arguments['p2'] = isset($_GET['p2']) ? $_GET['p2'] : '';
					$arguments['p3'] = isset($_GET['p3']) ? $_GET['p3'] : '';
					
					break;
				case 'POST':
					$arguments = $_POST;
					break;
					
				case 'PUT':
				case 'DELETE':
					parse_str(file_get_contents('php://input'), $arguments);
					break;
			}
			
			$accept = $_SERVER['HTTP_ACCEPT'];
			$this->handleRequest($url, $method, $arguments, $accept);
		}
		
		public function handleRequest($url, $method, $arguments, $accept) {
			echo "<b>Arguments</b><br />";
			var_dump($arguments);
			echo "<b>Route</b><br />";
			var_dump($this->route);
			parent::handleRequest($url, $method, $arguments, $accept);
		}
		
		protected function respond($statusCode) {
			header($this->statusHeaders[$statusCode]);
		}
		
		public function performGet($url, $arguments, $accept) {
			$this->respond("Ok");
		}
		
		public function performPost($url, $arguments, $accept) {
			$this->respond("Ok");
		}
		
		public function performPut($url, $arguments, $accept) {
			$this->respond("Ok");
		}
		
		public function performDelete($url, $arguments, $accept) {
			$this->respond("Ok");
		}
		
		public function performHead($url, $arguments, $accept) {
			$this->respond("MethodNotAllowed");
		}
	}
	
	$service = new BlogRestService();
	$service->handleRawRequest($_SERVER, $_GET, $_POST);
?>