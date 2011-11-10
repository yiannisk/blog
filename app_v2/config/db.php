<?php
	$domain = $_SERVER["SERVER_NAME"];
	if (stristr($domain, 'ioanniskaradimas.info') !== FALSE) {
		define('HOST', '127.0.0.1');
		define('DB', 'kl1nt_blog');
		define('USERNAME', 'kl1nt_blog');
		define('PASSWORD', '1k@r@d1m@s');
		define('FLOOD_LIMIT', 10);
	} else {
		define('HOST', '127.0.0.1');
		define('DB', 'blog');
		define('USERNAME', 'root');
		define('PASSWORD', '');
		define('FLOOD_LIMIT', 10);
	}
?>
