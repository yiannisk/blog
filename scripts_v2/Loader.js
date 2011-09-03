function Loader(element) {
	var base = new Atom(element);
	
	base.onEnterRegion = function (callback) {
		var Callback = callback;
		var self = base;
		
		$(base.region).hide();
		
		Utils.Preload('resources/loader.gif', function () {
			self.loaderImageLoaded(Callback);
		});
	}
	
	base.loaderImageLoaded = function (callback) {
		$(base.region)
			.append("<h5>Please wait. Resources are being loaded.</h5>")
			.fadeIn(3000);
		
		if (callback) callback();
	}
	
	base.onLeaveRegion = function (callback) {
		$(base.region).fadeOut();
		$(base.region).remove("h5");
		
		if (callback) callback();
	}
	
	base.onMessageReceived = function (message, callback) {
	}
	
	return base;
}