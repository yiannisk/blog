function Layout(element) {
	var base = new Atom(element);
	
	base.onEnterRegion = function (callback) {
		$(base.element).append("<div id='layout'></div>");
		var layout = $(base.getChildRegion('layout'));
		layout.hide();
		
		if (callback) callback();
	}
	
	base.onLeaveRegion = function (callback) {
		if (callback) callback();
	}
	
	base.onMessageReceived = function (message, callback) {
		if (callback) callback();
	}
	
	return base;
}