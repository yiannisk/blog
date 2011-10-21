<?php 
	interface IFileLocator
	{
		public function resolveLocation($name, $path);
		public function getFileName();
		public function getPath();
	}
?>