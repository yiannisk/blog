var ik = ik || {};

$(function () {
	ik.view = ik.view || {};
	ik.view.postList = ik.view.postList || {
		version: "0.02.001",
		make:
			function () {
				var core = ik.view.make();
				var enterCallBack = null;
				
				core.name = "postList";
				
				core.onEnterRegion = function (callback) {
					enterCallBack = callback;
					$.ajax({
						url: "app/?i=entry&a=latest",
						success: core.loadComplete});
				};
				
				core.onLeaveRegion = function (callback) {
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
				
				core.attachEventHandlers = function () {
					$(".readmore").click( core.handlers.readMoreClick );
				};
				
				core.detachEventHandlers = function () {
					$(".readmore").unbind("click");
				};
				
				core.handlers = {
					readMoreClick: function (evt) {
						var id = evt
							.currentTarget
							.id
							.substring("readmore".length);
						
						layout.draw(ik.view.post.make(id), "leftPartContents");
						
						return false;
					}
				};
				
				return core;
			}
	};
});