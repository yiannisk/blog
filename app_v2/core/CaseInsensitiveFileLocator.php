<?php
	class CaseInsensitiveFileLocator
	{
		private $path, $filename;
	
		/*** IFileLocator implementation ***/
		public function resolveLocation($name, $path)
		{
			$d = @dir($path);
			while($entry = $d->read())
				if (strcasecmp($name, $entry) == 0)
				{
					$this->path = "$path$entry";
					$this->filename = substr($entry, 0, strrpos($entry, '.'));
					return true;
				}
				
			return false;
		}
		
		public function getPath($default)
		{
			return isset($this->path)
				? $this->path
				: $default;
		}
		
		public function getFileName($default)
		{
			return isset($this->filename)
				? $this->filename
				: $default;
		}
		/*** IFileLocator implementation ends ***/
	}
?>