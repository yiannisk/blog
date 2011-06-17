<?php
	include_once('EntryModel.php');
	include_once('../core/ApplicationSettings.php');
	
	$o = new EntryModel(ApplicationSettings::current());
	$x = $o->single(1);
	
	var_dump($x);
	
	$latest = $o->latest(2);
	
	var_dump($latest);
?>