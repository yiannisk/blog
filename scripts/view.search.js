var ik = ik || {};

$(function () {
	ik.view = ik.view || {};
	ik.view.search = ik.view.search || {
		version: "0.02.000",
		make: function (id) {
			var core = ik.view.make();
			var enterCallBack = null;
			
			core.name = "search";
			core.id = id;
			
			core.onEnterRegion = function (callback) {
				// draw the search here.
				core.attachEventHandlers();
				callback();
			};
			
			core.onLeaveRegion = function (callback) {
				core.detachEventHandlers();
				$(core.region).fadeOut("fast", callback);
			};
			
			core.attachEventHandlers = function () {
				//
			};
			
			core.detachEventHandlers = function () {
				//
			};
			
			core.handlers = {
			};
			
			return core;
		}
	};
});