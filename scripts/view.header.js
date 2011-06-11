var ik = ik || {};

$(function () {
	ik.view = ik.view || {};
	ik.view.header = ik.view.header || {
		version: "0.01.003",
		make:
			function () {
				var core = ik.view.make();
				var enterCallBack = null;
				
				core.name = "header";
				
				core.onEnterRegion = function (callback) {
					enterCallBack = callback;
					$.ajax({
						url: "app/?i=header",
						success: core.loadComplete});
				};
				
				core.onLeaveRegion = function (callback) {
					$(region).fadeOut("fast", callback);
				};
				
				
				core.loadComplete = function (data, textStatus, jqXHR) {
					$(core.region)
						.html(data)
						.hide()
						.fadeIn(enterCallBack);
				};
				
				return core;
			}
	};
});