var ik = ik || {};

$(function () {
	ik.view = ik.view || {};
	ik.view.post = ik.view.post || {
		version: "0.02.000",
		make: function (id) {
			var core = ik.view.make();
			var enterCallBack = null;
			
			core.name = "post";
			core.id = id;
			
			core.onEnterRegion = function (callback) {
				enterCallBack = callback;
				$.ajax({
					url: "app/?i=entry&a=selected&id=" + core.id,
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
				$(".backtolist").click( core.handlers.backtToListClick );
			};
			
			core.detachEventHandlers = function () {
				$(".backtolist").unbind("click");
			};
			
			core.handlers = {
				backtToListClick: function (evt) {
					layout.draw(
						ik.view.postList.make(), 
						"leftPartContents");
					
					return false;
				}
			};
			
			return core;
		}
	};
});