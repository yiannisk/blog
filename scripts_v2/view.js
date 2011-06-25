function View() {
	var base = new Dynamic();
	
	base.region = null;
	base.name = "view";
	base.map({
		enter: function (callback) {
			if (this.onEnterRegion) this.onEnterRegion(callback);
			else if (callback) callback();
		},
		
		leave: function (callback) {
			if (this.onLeaveRegion) this.onLeaveRegion(callback);
			else if (callback) callback();
		},
		
		message: function (message, callback) {
			if (this.onMessageReceived) 
				this.onMessageReceived(message, callback);
			else if (callback) callback();
		}
	});
	
	return base;
}