var ik = ik || {};

$(function () {
	ik.view = ik.view || {};
	ik.view.postList = ik.view.postList || {
		make: function () {
			var core = ik.view.make();
			var enterCallBack = null;
			
			core.name = 'postList';
			core.template = 'latestEntriesTemplate';
			
			core.supportedHashes = ["post"];
			
			core.onHashRequest = function (hashName, hashValue) {
				$("#readmore" + hashValue).click();
			};
			
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
							url: "app_v2/entry/latest",
							dataType: "json",
							success: core.loadDataComplete});
					}});
			};
			
			core.loadDataComplete = function (data, textStatus, jqXHR) {
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
				if (enterCallBack) enterCallBack();
			};
			
			core.onLeaveRegion = function (callback) {
				core.detachEventHandlers();
				$(core.region).fadeOut("fast", callback);
			};
			
			core.attachEventHandlers = function () {
				$(".readmore").click( core.handlers.readMoreClick );
				$(".retweet").hover(
					core.handlers.retweetIn,
					core.handlers.retweetOut);
			};
			
			core.detachEventHandlers = function () {
				$(".readmore").unbind("click");
				$(".retweet").unbind("hover");
			};
			
			core.handlers = {
				readMoreClick: function (evt) {
					var id = evt
						.currentTarget
						.id
						.substring("readmore".length);
					
					layout.draw(ik.view.post.make(id), 'leftPartContents');
					
					return false;
				},
				
				retweetIn: function (evt) {
					$(evt.currentTarget).animate(
						{backgroundColor: '#000000'}, 'fast');
				},
				
				retweetOut: function (evt) {
					$(evt.currentTarget).animate(
						{backgroundColor: '#3F3F3F'}, 'fast');
				}
			};
			
			return core;
		}
	};
});