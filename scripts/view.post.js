var ik = ik || {};

$(function () {
	ik.view = ik.view || {};
	ik.view.post = ik.view.post || {
		make: function (id) {
			var core = ik.view.make();
			var enterCallBack = null;
			var leaveCallBack = null;
			
			core.name = "post";
			core.template = 'entryTemplate';
			core.id = id;
			
			core.onEnterRegion = function (callback) {
				enterCallBack = callback;
				
				$.ajax({
					url: "template/entry.html",
					dataType: "html",
					success: function (data, textStatus, jqXHR) {
						$('body').append(data);
						$('#' + core.template) 
							.template(core.template);
		
						$.ajax({
							url: "app_v2/entry/single/" + core.id,
							dataType: "json",
							success: core.loadDataComplete});
					}});
			};
			
			core.onLeaveRegion = function (callback) {
				leaveCallback = callback;
				layout.requestRegion("comments", core.unloadComplete);
			};
			
			core.unloadComplete = function () {
				console.log("core.unloadComplete");
				core.detachEventHandlers();
				$(core.region).fadeOut("fast", callback);
				
				if (leaveCallBack) leaveCallBack();
			};
			
			core.loadDataComplete = function (data, textStatus, jqXHR) {
				$(core.region).hide().html('');
				$.tmpl(core.template, data).appendTo($(core.region));
				$(core.region).fadeIn();
				
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