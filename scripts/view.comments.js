var ik = ik || {};

$(function () {
	ik.view = ik.view || {};
	ik.view.comments = ik.view.comments || {
		make: function (entryid) {
			var core = ik.view.make();
			var enterCallBack = null;
			
			core.name = "latestComments";
			core.entryid = entryid;
			
			core.onEnterRegion = function (callback) {
				enterCallBack = callback;
				$.ajax({
					url: "app/?i=comment&a=latest&count=3&entryid=" 
						+ core.entryid,
					success: core.loadComplete});
			
			};
			core.onLeaveRegion = function (callback) {
				console.log("Leaving comments region");
				core.detachEventHandlers();
				$(core.region).fadeOut("fast", callback);
			};
			
			core.loadComplete = function (data, textStatus, jqXHR) {
				$(core.region)
					.html(data)
					.hide()
					.fadeIn();
				
				core.attachEventHandlers();
				
				if (enterCallBack) enterCallBack();
			};
			
			core.attachEventHandlers = function () {};
			
			core.detachEventHandlers = function () {};
			
			core.handlers = {};
			
			return core;
		}
	}
});