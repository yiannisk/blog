var ik = ik || {};

$(function () {
	ik.view = ik.view || {};
	ik.view.header = ik.view.header || {
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
					core.detachEventHandlers();
					$(region).fadeOut("fast", callback);
				};
				
				
				core.loadComplete = function (data, textStatus, jqXHR) {
					$(core.region)
						.html(data)
						.hide()
						.fadeIn(enterCallBack);
					
					core.attachEventHandlers();
				};
				
				core.attachEventHandlers = function () {
					$("#closeIcon").bind('click', core.handlers.closeIconClick);
				};
				
				core.detachEventHandlers = function () {
					$("#closeIcon").unbind('click');
				};
				
				core.handlers = {
					closeIconClick: function (evt) {
						$("#header").hide('slide', { direction: "up" }, 
							function () {
								layout.sendMessage("search","HEADER_HIDDEN");
							});
					}
				};
				
				return core;
			}
	};
});