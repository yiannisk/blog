var ik = ik || {};

$(function () {

		ik.view = ik.view || {
		make:
			function () {
				var core = ik.dynamic.make();
				core.region = null;
				core.name = "baseView";
				core.map({
					enter: 
						function (callback) {
							if (this.onEnterRegion) 
								this.onEnterRegion(callback);
							else if (callback) callback();
						},
						
					leave: 
						function (callback) {
							if (this.onLeaveRegion) 
								this.onLeaveRegion(callback);
							else if (callback) callback();
						},
						
					message:
						function (message, callback) {
							if (this.onMessageReceived) 
								this.onMessageReceived(message, callback);
							else if (callback) callback();
						}
				});
				
				return core;
			}
	};

});