function Sequence() {
	// the queue of deferred calls
	this.queue = [];
	this.waiting = false;
	this.waittime = 100;
	
	// a function to create multiple deferred methods out of
	// a template object.
	this.map = function (mp) { 
		for(entry in mp)
			this.register(entry, mp[entry]);
	};
	
	this.hold = function () { this.waiting = true; };
	this.resume = function () { this.waiting = false; };
	
	// registers a method wrapper for a method to be mapped.
	this.register = function (name, func) {
		var self = this;
		var nameForDispatch = name;
		var funk = func;
		
		this[name] = function () { 
			var args = arguments;
			self.dispatch(nameForDispatch, 
				funk, 
				arguments); 
			return self;
		}
	};
	
	// represents the actual dispatch call, which will queue 
	// the request for action instead of immediately executing 
	// it, if more objects are on queue. Invokes itself if more 
	// queued items exist using setTimeout to effect 
	// asynchronous operation.
	this.dispatch = function (name, func, pargs) {
		var self = this;

		// collect arguments from the call, to apply them
		// when the actual invocation takes place.
		var args = [];
		for(var i = 0; i < pargs.length; i++)
			args.push(pargs[i]);

		// queue the function's invocation for later.
		this.queue.push({ 
			method: name, 
			body: func, 
			arguments: args 
		});
		
		// if no other queue items exist at this time, 
		// start execution.
		if (this.queue.length == 1) 
			setTimeout(function () {self.done(self);},1);
	};
	
	// proceeds to execute the next item in queue by means of 
	// setTimeout, to ensure it happens asynchronously.
	this.done = function(self) {
		// if no queue items exist, halt.
		if (self.queue.length == 0) return;
		
		// if something in the call needs waiting, wait
		// as long as necessary.
		if (self.waiting) {
			setTimeout(self.done, self.waittime, self);
			return;
		}
		
		// get and call the current function.
		var currentCall = self.queue.shift();
		currentCall.body.apply(self, currentCall.arguments);
		
		// move to the next item asynchronously.
		// note: this is quite ugly, but it seems to be
		// working...
		setTimeout( function () { self.done(self); }, 1 );
	};
}

function Join(callback) {
	var paths = 0;
	var triggerCallback = callback;
	
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
