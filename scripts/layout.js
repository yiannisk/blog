var ik = ik || {};
	
$(function () {
	
	ik.layout = ik.layout || {
		make: function () {
			var core = ik.dynamic.make();
		
			core.views = [];

			core.map({
				// This is used to keep track of all view objects. Each view
				// must have a unique name. It could be different, but I 
				// like things labelled, to more easily track any problems.
				registerView: function (view) {
					if (!this.views[view.name])
						this.views[view.name] = view;
				},
			
				// In order for the layout to function properly, a view
				// must first request the region it's about to be drawn in.
				// This allows the view that's already taking the space to
				// react, executing clean-up, animation or whatever other
				// tasks needed.
				requestRegion:  function (regionId, callback) {
					var self = this;
					var callBack = callback;
					
					// Hold off executing any more calls while looking
					// for views rendered in the requested region.
					self.wait = true;
					
					// Iterate through the collection of views for 
					// the view taking the region now requested. 
					for(var viewName in self.views) {
						if ((self.views[viewName].region) 
						    && (self.views[viewName].region.id == regionId)) {
							// A view has been found. Free it.
							self.views[viewName].leave( 
								function () { 
									// Notify the base we're now free to 
									// continue executing calls.
									self.wait = false; 
									
									// Notify the requestRegion's invoker 
									// we're done releasing the view.
									callBack();
								});
								
							// Return; Everything else will happen 
							// in the callback above.
							return;
						}
					}
					
					// No views were found that take up the region. start 
					// taking calls again, and notify the invoker that 
					// all's clear.
					self.wait = false;
					callback();
				},
				
				// This method can alone handle the total functionality of 
				// the layout. To use, create a view and hand it over, also 
				// specifying the region to draw it on.
				draw: function (view, regionId, callback) {
					var self = this;
					var selectedView = view;	
					var callBack = callback;
					
					// Register the view if it's not already done.
					self.registerView(view);
					
					// Request the region passed for drawing the view in.
					self.requestRegion(regionId, function() {
						// When the region is freed, allow the new view 
						// to start rendering, passing it the region's 
						// reference so it draws itself.
						selectedView.region = $("#" + regionId)[0];
						selectedView.enter(callBack);
					});
				},
					
				// sends a message to a specific view if it can be located.
				sendMessage: function (view, message, callback) {
					if (!this.views[view]) return false;
					if (!this.views[view].message)
						throw new Error(
							"The view specified does not support messaging.");
							
					this.views[view].message(message, callback);
					return true;
				}
			});
			
			return core;
		}
	};
	
});