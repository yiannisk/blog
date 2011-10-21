<?php
	interface IApplicationContext
	{
		public function initialize($request, $convention, $settings);
		public function dispatch();
	}
?>