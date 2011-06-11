<?php
	class CaseInsensitiveFileLocator implements IFileLocator
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
					return;
				}
		}
		
		public function getPath()
		{
			return isset($this->path)
				? $this->path
				: false;
		}
		
		public function getFileName()
		{
			return isset($this->filename)
				? $this->filename
				: false;
		}
		/*** IFileLocator implementation ends ***/
	}
?>