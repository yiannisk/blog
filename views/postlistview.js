function PostListView() {
	var core = new View();
	var enterCallBack = null;
	
	core.name = 'postList';
	core.model = new EntryModel();

	core.onEnterRegion = function (callback) {
		enterCallBack = callback;
		
		core.template2('latestEntries', function () {
			core.model.latest(core.loadDataComplete);
		});
	};
	
	core.loadDataComplete = function (data, textStatus, jqXHR) {
		core.templates.latestEntries.apply(data, function (tplData) {
			$(core.region).hide().html('');
			$(tplData).appendTo($(core.region));
			
			for(var index in data) {
				var item = data[index];
				if (item.contents == "") {
					$("#readmore" + item.code).hide();
				}
				
				if (item.tags && item.tags != "") {
					$("#tags" + item.id).html("<div class='tag'>"
						 + item.tags.replace(/,/gi, "</div><div class='tag'>")
						 + "</div");
				}
			}
			
			$(core.region).fadeIn();
			core.handlers.resizeBaseLayout(null, function () {
				$(window).trigger('resize');
			});
			core.attachEventHandlers();
			if (enterCallBack) enterCallBack();
		});
	};
	
	core.onLeaveRegion = function (callback) {
		core.detachEventHandlers();
		$(core.region).fadeOut("fast", callback);
	};
	
	core.attachEventHandlers = function () {
		$(window).bind('resize', 
			core.handlers.resizeBaseLayout);
	};
	
	core.detachEventHandlers = function () {
		$(".retweet").unbind("hover");
	};
	
	core.handlers = {
		resizeBaseLayout: function (evt, callback) {
			var cb = callback;
			var baseLayoutHeight = 800;
			var targetLayoutHeight = 
			($(core.region).height() > baseLayoutHeight)
			? $(core.region).height() + 100
			: baseLayoutHeight;
			
			$('#layout').css('height', targetLayoutHeight + 'px');
			$('#rightPart').css('height', 
			(targetLayoutHeight - 30 ) + 'px');
			if (cb) cb();
		}
	};
	
	return core;
}