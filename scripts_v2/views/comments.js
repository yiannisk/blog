function Comments() {
	var base = new View();
	
	base.name = "CommentsView";
	
	base.onEnterRegion = function (callback) {
		$(base.region).hide().html("CommentsView").fadeIn();
		console.log(base.name + " onEnterRegion");
		if (callback) callback();
	};
	
	base.onLeaveRegion = function (callback) {
		$(base.region).fadeOut();
		console.log(base.name + " onLeaveRegion");
		callback();
	}
	
	return base;
}