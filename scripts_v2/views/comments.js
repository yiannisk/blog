function Comments() {
	var base = new View();
	
	base.name = "CommentsView";
	
	base.onEnterRegion = function (callback) {
		$(base.region).hide().html("CommentsView").fadeIn();
		console.log(base.name + " onEnterRegion");
	};
	
	base.onLeaveRegion = function (callback) {
		$(base.region).hide().html("");
		console.log(base.name + " onLeaveRegion");
	}
	
	return base;
}