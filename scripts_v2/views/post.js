function Post() {
	var base = new View();
	
	base.name = "PostView";
	
	base.onEnterRegion = function (callback) {
		console.log(base.name + " onEnterRegion");
		$(base.region).hide().html("PostView").fadeIn();
		layout.draw(new Comments(), "region2");
	};
	
	base.onLeaveRegion = function (callback) {
		console.log(base.name + " onLeaveRegion");
		$(base.region).hide().html("");
		layout.requestRegion("region2");
	}
	
	return base;
}