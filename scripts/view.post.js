var ik = ik || {};

$(function () {
	ik.view = ik.view || {};
	ik.view.post = ik.view.post || {
		make: function (id) {
			var core = ik.view.make();
			var enterCallBack = null;
			var leaveCallBack = null;
			
			core.name = "post";
			core.id = id;
			
			core.onEnterRegion = function (callback) {
				enterCallBack = callback;
				$.ajax({
					url: "app/?i=entry&a=selected&id=" + core.id,
					success: core.loadComplete});
			
			};
			
			core.onLeaveRegion = function (callback) {
				console.log("Leaving region...");
				leaveCallback = callback;
				layout.requestRegion("comments", core.unloadComplete);
			};
			
			core.unloadComplete = function () {
				console.log("core.unloadComplete");
				core.detachEventHandlers();
				$(core.region).fadeOut("fast", callback);
				
				if (leaveCallBack) leaveCallBack();
			};
			
			core.loadComplete = function (data, textStatus, jqXHR) {
				$(core.region)
					.html(data)
					.hide()
					.fadeIn();
				
				core.attachEventHandlers();
				
				layout.draw(ik.view.comments.make(id), "comments");
				
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