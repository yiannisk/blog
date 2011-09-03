var ik = ik || {};

$(function () {
	ik.view = ik.view || {};
	ik.view.postList = ik.view.postList || {
		make: function () {
			var core = ik.view.make();
			var enterCallBack = null;
			
			core.name = 'postList';
			core.template = 'latestEntriesTemplate';
			
			core.onEnterRegion = function (callback) {
				enterCallBack = callback;
				$.ajax({
					url: "template/latestEntries.html",
					dataType: "html",
					success: function (data, textStatus, jqXHR) {
						$('body').append(data);
						$('#' + core.template)
							.template(core.template);

						$.ajax({
							url: "app_v2/entry/latest/3",
							dataType: "json",
							success: core.loadDataComplete});
					}});
			};
			
			core.loadDataComplete = function (data, textStatus, jqXHR) {
				$(core.region).hide().html('');
				$.tmpl(core.template, data).appendTo($(core.region));			
				$(core.region).fadeIn();
				
				core.attachEventHandlers();
				if (enterCallBack) enterCallBack();
			};
			
			core.onLeaveRegion = function (callback) {
				core.detachEventHandlers();
				$(core.region).fadeOut("fast", callback);
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
					
					layout.draw(ik.view.post.make(id), 'leftPartContents');
					
					return false;
				}
			};
			
			return core;
		}
	};
});