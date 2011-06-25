function Layout() {
	var base = new Dynamic();
	
	base.views = [];
	
	base.map({
		registerView: function (view) {
			if (!this.views[view.name])
				this.views[view.name] = view;
		},
		
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
				selectedView.region = $("#" + regionId)[0];
				selectedView.enter(callBack);
			});
		},
			
		sendMessage: function (view, message, callback) {
			if (!this.views[view]) return false;
			if (!this.views[view].message)
				throw new Error(
					"The view specified does not support messaging.");
					
			this.views[view].message(message, callback);
			return true;
		}
	});
	
	return base;
}
