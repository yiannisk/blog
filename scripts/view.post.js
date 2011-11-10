var ik = ik || {};

$(function () {
	ik.view = ik.view || {};
	ik.view.post = ik.view.post || {
		make: function (id) {
			var core = ik.view.make();
			var enterCallBack = null;
			
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
				location.hash = "";
				core.detachEventHandlers();
				$(core.region).fadeOut().html('').fadeIn();
				if (callback) callback();
			};
			
			core.loadDataComplete = function (data, textStatus, jqXHR) {
				location.hash = "#post." + core.id;
				
				$(core.region).hide().html('');
				$.tmpl(core.template, data).appendTo($(core.region));
				$(core.region).fadeIn();
				
				var baseLayoutHeight = 800;
				var targetLayoutHeight = 
					($(core.region).height() > baseLayoutHeight)
						? $(core.region).height() + 100
						: baseLayoutHeight;
					
				$('#layout').css('height', targetLayoutHeight + 'px');
				$('#rightPart').css('height', (targetLayoutHeight - 30 ) + 'px');
					
				core.attachEventHandlers();
				layout.draw(ik.view.comments.make(id), "comments");
				if (enterCallBack) enterCallBack();
			};
			
			core.attachEventHandlers = function () {
				$(".backtolist").click( core.handlers.backtToListClick );
				$(".backtotop").click( core.handlers.backToTopClick );
			};
			
			core.detachEventHandlers = function () {
				$(".backtolist").unbind("click");
				$(".backtotop").unbind("click");
			};
			
			core.handlers = {
				backToTopClick: function (evt) {
					evt.stopPropagation();
					window.toTop();
					return false;
				},
				
				backtToListClick: function (evt) {
					layout.requestRegion("comments", function () {
						layout.draw(ik.view.postList.make(), "leftPartContents");
						window.toTop();
					});
					
					return false;
				}
			};
			
			return core;
		}
	};
});