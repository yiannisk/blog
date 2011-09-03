function LoaderContainer(element) {
	var base = new Atom(element);
	
	base.onEnterRegion = function (callback) {
		$(base.element).append("<div id='loaderContainer'></div>");
		
		try {
			var loaderContainer = $(base.getChildRegion('loaderContainer'));
			
			loaderContainer
				.append("<div id='loader' class='loader'></div>")
				.addClass('loaderContainer')
				.show()	
				.animate({height: 305}, 800, 'easeOutBounce');
			
			base.draw(new Loader(), "loader", callback);
			base.loaderContainer = loaderContainer;
			
			setTimeout(
				function() {
					base.requestRegion('loader');
					loaderContainer.remove('#loader');
					var layout = new Layout(base.element);
				}, 1000);
		} catch(err) {
			if (callback) callback();
		}
	}
	
	base.onLeaveRegion = function (callback) {
		if (base.loaderContainer)
			$(base.loaderContainer).remove();
		
		if (callback) callback();
	}
	
	base.onMessageReceived = function (message, callback) {
	
		if (callback) callback();
	}
	
	return base;
}