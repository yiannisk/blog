function Atom(element) {
	var base = new Dynamic();
	
	base.element = element;
	
	base.region = null;
	base.name = "view";
	
	base.views = [];
	
	base.getChildRegion = function (regionIdentifier) {
		var query = element 
			? $(element).find("#" + regionIdentifier)
			: region
				? $(region).find("#" + regionIdentifier)
					: null;
		
		if (!query)
			throw new Error("No element or region was selected " +
				"for this object.");
		
		if (query.length == 0) 
			throw new Error("Region " + regionIdentifier 
				+ " not found in: " + element.nodeName);
		
		return query[0];
	}
	
	base.map({
		registerView: function (view) {
			if (!this.views[view.name])
				this.views[view.name] = view;
		},
		
		/* Region container starts. */
		requestRegion:  function (regionId, callback) {
			var self = this;
			var callBack = callback;
			
			this.wait = true;
			
			for(var viewName in this.views) {
				if ((this.views[viewName].region) 
					&& (this.views[viewName].region.id == regionId)) {
					this.views[viewName].leave(
						function () { 
							self.wait = false; 
							if (callBack) callBack();
						});
						
					return;
				}
			}
			
			this.wait = false;
			callback();
		},
		
		draw: function (view, regionId, callback) {
			var self = this;
			var selectedView = view;	
			var callBack = callback;
			
			self.registerView(view);
			
			self.requestRegion(regionId, function() {
				selectedView.region = self.getChildRegion(regionId);
				selectedView.enter(callBack);
			});
		},
		/* Region container ends. */
		
		/* Messaging starts. */
		sendMessage: function (view, message, callback) {
			if (!this.views[view]) return false;
			this.views[view].receiveMessage(message, callback);
			return true;
		},
		/* Messaging ends. */
		
		/* View starts. */
		enter: function (callback) {
			if (this.onEnterRegion) this.onEnterRegion(callback);
			else if (callback) callback();
		},
		
		leave: function (callback) {
			if (this.onLeaveRegion) this.onLeaveRegion(callback);
			else if (callback) callback();
		},
		
		receiveMessage: function (message, callback) {
			if (this.onMessageReceived) 
				this.onMessageReceived(message, callback);
			else if (callback) callback();
		}
		/* View ends. */
	});
	
	if (base.element)
		base.enter();
	
	return base;
}
