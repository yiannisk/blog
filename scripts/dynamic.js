var ik = ik || {};

$(function () {

	/** A dynamic proxy effort, not yet complete. **/
	ik.dynamic = ik.dynamic || {
		/** creation ala Ruby fits JavaScript more. **/
		make: function () {
			return {
				// a way to wait for asynchronous call completion.
				wait: false,
				waittime: 100,
				
				hold: function () {
					this.wait = true;
				},
				
				resume: function () { 
					this.wait = false; 
				},
				
				isHolding: function () { 
					return this.wait; 
				},
				
				// the queue of deferred calls
				queue: [],
				
				// a function to create multiple deferred methods out of
				// a template object.
				map: function (map) {
					for(entry in map) this.register(entry, map[entry]);
				},
				
				// registers a wrapper to invoke the method.
				register: function (name, func) {
					var self = this;
					var nameForDispatch = name;
					var funk = func;
					this[name] = 
						function () { 
							var args = arguments;
							self.dispatch(nameForDispatch, 
								funk, 
								arguments); 
							return self;
						}
				},
				
				// represents the actual dispatch call, which will queue 
				// the request for action instead of immediately executing 
				// it, if more objects are on queue. Invokes itself if more 
				// queued items exist using setTimeout to effect 
				// asynchronous operation.
				dispatch: function (name, func, pargs) {
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
						arguments: args });
					
					// if no other queue items exist at this time, 
					// start execution.
					if (this.queue.length == 1) 
						setTimeout(function () {self.done(self);},1);
				},
				
				// proceeds to execute the next item in queue by means of 
				// setTimeout, to ensure it happens asynchronously.
				done: function(self) {
					// if no queue items exist, halt.
					if (self.queue.length == 0) return;
					
					// if something in the call needs waiting, wait
					// as long as necessary.
					if (self.wait) {
						setTimeout(self.done, self.waittime, self);
						return;
					}
					
					// get and call the current function.
					var currentCall = self.queue.shift();
					currentCall.body.apply(self, currentCall.arguments);
					
					// move to the next item asynchronously.
					setTimeout( function () { self.done(self); }, 1 );
				},
				
				// provides an alternative ajax method that is aware
				// of dynamic's capabilities.
				ajax: function (call) {
					var self = this;
					var oldComplete = call.complete;

					call.complete = function (jqXHR, textStatus) {
						if (oldComplete)
							oldComplete(jqXHR, textStatus);
						
						self.resume();
					};
					
					self.hold();
					$.ajax(call);
				}
			};
		}
	}

});