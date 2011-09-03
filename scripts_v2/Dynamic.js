function Dynamic() {
	this.wait = false;
	this.waittime = 100;
	this.queue = [];
	
	this.map = function (mappings) {
		for (var key in mappings)
			this.register(key, mappings[key]);
	}
	
	this.register = function (name, func) {
		this[name] = function() {
			this.dispatch(name, func, arguments);
		}
	}
	
	this.dispatch = function (name, func, args) {
		this.queue.push({
			method: name,
			body: func, 
			arguments: args
		});
		
		var self = this;
		if (this.queue.length == 1)
			setTimeout(function () { self.done(self); }, 10);
	}
	
	this.done = function (dynamicObject) {
		if (!dynamicObject) return;
		if (dynamicObject.queue.length == 0) return;
		if (dynamicObject.wait)
			setTimeout(dynamicObject.done, dynamicObject.waittime);
			
		var currentCall = dynamicObject.queue.shift();
		
		currentCall.body.apply(dynamicObject, currentCall.arguments);
		
		setTimeout(function () { dynamicObject.done(dynamicObject); }, 10);
	}
}