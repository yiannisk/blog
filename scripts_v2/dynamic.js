function Dynamic() {
	this.wait = false;
	this.waittime = 100;
	this.queue = [];
	
	this.map = function (mappings) {
		for(key in mappings)
			this.register(key, mappings[key]);
	}
	
	this.register = function (name, func) {
		var _name = name;
		var _func = _func;
		var _self = this;
		
		this[name] = function() {
			_self.dispatch(_name, _func, arguments);
			return this;
		}
	}
}