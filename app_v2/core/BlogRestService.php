<?php
	class BlogRestService {
		
		private $statusHeaders = array(
			'Ok' => 'HTTP/1.1 200 OK',
			'Created' => 'HTTP/1.1 201 Created',
			'Accepted' => 'HTTP/1.1 202 Accepted',
			'NoContent' => 'HTTP/1.1 204 No Content',
			'Found' => 'HTTP/1.1 302 Found',
			'NotModified' => 'HTTP/1.1 304 Not Modified',
			'BadRequest' => 'HTTP/1.1 400 Bad Request',
			'Unauthorized' => 'HTTP/1.1 401 Unauthorized',
			'Forbidden' => 'HTTP/1.1 402 Forbidden',
			'NotFound' => 'HTTP/1.1 404 Not Found',
			'MethodNotAllowed' => 'HTTP/1.1 405 Not Allowed',
			'InternalServerError' => 'HTTP/1.1 500 Internal Server Error'
		);
		
		private $route;
		
		public function handleRawRequest($_SERVER, $_GET, $_POST) {
			$url = $this->getFullUrl($_SERVER);
			$method = $_SERVER['REQUEST_METHOD'];
			
			$item = isset($_GET['item']) ? $_GET['item'] : '';
			$action = isset($_GET['action']) ? $_GET['action'] : '';
			$identifier = isset($_GET['id']) ? $_GET['id'] : '';
			$route = new Route($item, $action, $identifier);
			
			$arguments = array();
			
			switch ($method) {
				case 'GET':
					if (isset($_GET['p0'])) $arguments['p0'] = $_GET['p0'];
					if (isset($_GET['p1'])) $arguments['p1'] = $_GET['p1'];
					if (isset($_GET['p2'])) $arguments['p2'] = $_GET['p2'];
					if (isset($_GET['p3'])) $arguments['p3'] = $_GET['p3'];
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
			
			$req = new Request($url, $method, $arguments, $accept, $route);
			
			$this->handleRequest($req);
		}
		
		protected function getFullUrl($_SERVER) {
			$protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] == 'on' ? 'https' : 'http';
			$location = $_SERVER['REQUEST_URI'];
			if ($_SERVER['QUERY_STRING']) 
				$location = substr($location, 0, strrpos($location, $_SERVER['QUERY_STRING']) - 1);
			
			return $protocol.'://'.$_SERVER['HTTP_HOST'].$location;
		}
		
		protected function handleRequest($req) {
			echo "<b>Arguments</b><br />";
			var_dump($req->arguments);
			echo "<b>Route</b><br />";
			var_dump($req->route);
			
			switch($req->method) {
				case 'GET':
					$this->performGet($req);
					break;
				case 'POST':
					$this->performPost($req);
					break;
				case 'PUT':
					$this->performPut($req);
					break;
				case 'DELETE':
					$this->performDelete($req);
					break;
				default:
					header('Allow: ' . $this->supportedMethods, true, 501);
			}
		}
		
		protected function respond($statusCode) {
			header($this->statusHeaders[$statusCode]);
		}
		
		protected function getAction($controller, $action, $default) {
			return
				(isset($action) && method_exists($controller, $action))
					? $action
					: $default;
		}
		
		public function performGet($req) {
			$req->route->loadController('Controller.php');
			$req->route->setAction('items');
			$req->route->dispatch($req);
			$this->respond("Ok");
		}
		
		public function performPost($req) {
			$this->respond("Ok");
			$controller = getController($req->route['item']);
			
		}
		
		public function performPut($req) {
			$this->respond("Ok");
		}
		
		public function performDelete($req) {
			$this->respond("Ok");
		}
	}
?>