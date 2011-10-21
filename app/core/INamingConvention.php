<?php
	interface INamingConvention
	{
		public function getControllerName($name);
		public function getFileLocator();
		public function getDefaultAction();
		public function getViewName($name);
		public function getModelName($name);
	}
?>