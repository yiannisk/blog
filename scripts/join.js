function Join(cb) {
	var paths = 0;
	var triggerCallback = cb;

	this.add = function () {
		paths ++;
		return this.call;
	};
	
	this.call = function () {
		paths --;
		if (paths == 0)
			if (triggerCallback)
				triggerCallback();
	};
	
	return this;
}

