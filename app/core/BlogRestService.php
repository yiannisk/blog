<?php
	include_once('config/defaults.php');

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
			#var_dump($route);
			#var_dump($method);

			switch ($method) {
				case 'GET':
					for($i = 0; $i < 4; $i++)
						if (isset($_GET["p$i"])) 
							$arguments["p$i"] = $_GET["p$i"];
					
					#var_dump($arguments);
					#die("All cool");

					break;
					
				case 'POST':
					if (strcasecmp($item, 'login') == 0)
					{
						if (!isset($_POST['username']) 
							|| !isset($_POST['password']))
						{
							$this->respond('InternalServerError');
							return;
						}
						$route->setAction('login');
						$arguments['username'] = $_POST['username'];
						$arguments['password'] = $_POST['password'];
					}
					else
					{
						$arguments = $_POST;
					}
					
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
			$protocol = 
				isset($_SERVER['HTTPS']) 
					&& $_SERVER['HTTPS'] == 'on' 
						? 'https' 
						: 'http';
						
			$location = $_SERVER['REQUEST_URI'];
			
			if ($_SERVER['QUERY_STRING']) 
				$location = substr($location, 0, 
					strrpos($location, $_SERVER['QUERY_STRING']) - 1);
			
			return "$protocol://{$_SERVER['HTTP_HOST']}$location";
		}
		
		protected function handleRequest($req) {
			switch($req->method) {
				case 'GET':
					$this->get($req);
					break;
				case 'POST':
					$this->post($req);
					break;
				case 'PUT':
					$this->put($req);
					break;
				case 'DELETE':
					$this->delete($req);
					break;
				default:
					header('Allow: ' . $this->supportedMethods, true, 501);
			}
		}
		
		protected function respond($statusCode) {
			header($this->statusHeaders[$statusCode]);
		}
		
		public function get($req) {
			ob_start();

			try {
				$req->route->loadController(DEFAULT_CONTROLLER);
				$req->route->loadAction(GET_DEFAULT);
				$req->route->dispatch($req);
				$this->respond('Ok');
			} catch (Exception $e) {
				$this->respond('InternalServerError');
			}

			ob_end_flush();
		}
		
		public function post($req) {
			try {
				$req->route->loadController(DEFAULT_CONTROLLER);
				$req->route->loadAction(POST_DEFAULT);
				$req->route->dispatch($req);
				$this->respond('Ok');
			} catch (Exception $e) {
				$this->respond('InternalServerError');
			}
		}
		
		public function put($req) {
			try {
				$req->route->loadController(DEFAULT_CONTROLLER);
				$req->route->loadAction(PUT_DEFAULT);
				$req->route->dispatch($req);
				$this->respond('Ok');
			} catch (Exception $e) {
				$this->respond('InternalServerError');
			}
		}
		
		public function delete($req) {
			$this->respond('Ok');
		}
	}
?>
