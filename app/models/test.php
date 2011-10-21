<?php
	include_once('EntryModel.php');
	include_once('../core/ApplicationSettings.php');
	
	$o = new EntryModel(ApplicationSettings::current());
	var_dump($o->latest(2));
?>