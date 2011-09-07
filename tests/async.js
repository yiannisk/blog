/* Idea 1: A call that's waiting on something else to happen. */
function DelayedCall(funk) {
  this.action = funk;
  this.arguments = [];
  for (var i = 1; i < arguments.length; i++)
    this.arguments.push(arguments[i]);
  this.invoke = function () {
    this.action.apply(this, this.arguments);
  }
}

var c = new DelayedCall( 
  function (param1) {console.log(param1);}, 
  "Method 1: Delayed calls.");
c.invoke();

/* Idea 2: An event wrapper for functions, and function triggers. */
var Events = {
	new: function (evtype, target, params) {
		var evt = { event: evtype, target: target };
		
		if (params)
			for(var paramName in params)
				evt[paramName] = params[paramName];
			
		return evt;
	},
	
	BEFORE: "before",
	AFTER: "after"
};

Function.prototype.listeners = [];

Function.prototype.fire = function (evtype) {
	if (!this.listeners) return;
	for(var i = 0; i < this.listeners.length; i++)
		this.listeners[i].handler(Events.new(evtype, this));
}

Function.prototype.listenFor = function (evtype, handler) {
	if (!handler) 
		throw new Error("Handler is null.");
		
	if (!evtype || evtype.length == 0) 
		throw new Error("Event type is null.");
	
	this.listeners.push({
		event: evtype,
		handler: handler
	});
}

Function.prototype.when = function (funk) {
	console.log(funk.caller);

	if (!funk) 
		throw new Error("Funk is null.");
		
	if (!this.name || this.name.length == 0) 
		throw new Error("Cannot bind anonymous function.");
	
	console.log(funk);
	
	var context = this.caller || window;
	var self = this;
	var action = context[this.name];

	context[this.name] = function() {
		var args = [];
		for(var i = 0; i < arguments.length; i++)
			args[i] = arguments[i];
		
		self.fire(Events.BEFORE);
		action.apply(context, args);
		self.fire(Events.AFTER);
	}
}



/*function EventDispatcher() {
  this.listeners = [];
  this.addEventListener = function (eventType, listener) {
    this.listeners.push({event: eventType, listener: listener});
  };
  
  this.removeEventListener = function (eventType, listener) {
    for(var i = 0; i < this.listeners.length; i ++)
      if (this.listeners[i].event == eventType
	&& this.listeners[i].listener == listener)
	this.listeners.splice(i, 1);
  }
  
  this.dispatchEvent = function (eventType) {
    for(var i = 0; i < this.listeners.length; i ++)
      if (this.listeners[i].event == eventType)
	this.listeners[i].listener({
	  target: this,
	  type: eventType
	});
  }
}

function Action(action) {
  var base = new EventDispatcher();
  
  base.events = { 
    BEFORE: "before",
    AFTER: "after"
  };
  
  base.action = action;
  
  base.arguments = [];
  for(var i = 1; i < arguments.length; i++)
    base.arguments.push(arguments[i]);
  
  base.invoke = function () {
    base.dispatchEvent(base.events.BEFORE);
    base.action.apply(base, base.arguments);
    base.dispatchEvent(base.events.AFTER);
  };
  
  return base;
}*/

function b() { console.log("b() called."); }
function a() { console.log("a() called."); }

a.when(b);

var c = {
	f: function () { console.log("c.f() called."); }
};

a.when(c.f);

/*
Function.prototype.testRewrite = function () {
  console.log(this.name);
  console.log(this.caller);
  console.log(window[this.name]);
  
  var context = this.caller || window;
  var self = this;
  var oldFunc = context[this.name];
  
  context[this.name] = function() {
    console.log("Rerouted call.");
    if (self.before) self.before();
    oldFunc.apply(context);
    if (self.after) self.after();
  }
}

b.after = a;
b.testRewrite();
b();
*/