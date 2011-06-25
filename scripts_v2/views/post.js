function Post() {
	var base = new View();
	
	base.name = "PostView";
	
	base.onEnterRegion = function (callback) {
		console.log(base.name + " onEnterRegion");
		$(base.region).hide().html("PostView").fadeIn();
		layout.draw(new Comments(), "region2");
		if (callback) callback();
	};
	
	base.onLeaveRegion = function (callback) {
		var _callback = callback;
		layout.requestRegion("region2", function () {
			console.log(base.name + " onLeaveRegion");
			$(base.region).fadeOut();
			_callback();
		});
	}
	
	return base;
}