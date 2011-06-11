<?php
	class ApplicationContext implements IApplicationContext
	{
		private $request, $convention, $settings;
		
		/*** IApplicationContext implementation ***/
		public function initialize($request, $convention, $settings)
		{
			if (!$request instanceof IHttpParameters)
				throw new Exception(
					'Invalid type: Request is not IHttpParameters');
			
			if (!$convention instanceof INamingConvention)
				throw new Exception(
					'Invalid type: Convention is not INamingConvention');
			
			if (!$settings instanceof ApplicationSettings)
				throw new Exception(
					'Invalid type: Settings is not ApplicationSettings');
			
			$this->request = $request;
			$this->convention = $convention;
			$this->settings = $settings;
		}
		
		public function dispatch()
		{
			// 00. if the request item isn't set, get the default item.
			$requestItem = 
				$this->request->getItem() !== false 
					? $this->request->getItem() 
					: $this->settings->getHomeController();
			
			// 01. get the proper controller name from the item's name, as per
			//     the current naming convention.
			$controllerName = 
				$this->convention->getControllerName($requestItem);
			
			// 02. attempt to locate, then include the controller class.
			$locator = $this->convention->getFileLocator();
			$locator->resolveLocation($controllerName, 
				$this->settings->getControllersLocation());
				
			include_once($locator->getPath());
			
			// 03. instantiate the controller.
			$controllerCaseSensitiveName = $locator->getFileName();
			$controller = 
				new $controllerCaseSensitiveName(
					$this->convention, 
					$this->settings);
			
			// 04. Make the call to the controller.
			$params = 
				$this->request->getParams() !== false
					? $this->request->getParams()
					: array();
			
			$method = 
				$this->request->getAction() !== false
					? $this->request->getAction()
					: $this->convention->getDefaultAction();
			
			$controller->$method($params);
		}
		/*** IApplicationContext implementation ends ***/
	}
?>