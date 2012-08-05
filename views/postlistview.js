function PostListView() {
	var core = new View();
	var enterCallBack = null;
	
	core.name = 'postList';
	core.model = new EntryModel();

	core.onEnterRegion = function (callback) {
		enterCallBack = callback;
		
		core.template('latestEntries', function () {
			core.model.latest(2, core.loadDataComplete);
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
				
				var tagsHtml = 
					"<div class='tag'>"
						 + item.tags
						 	.replace(/,/gi, "</div><div class='tag'>")
						 + "</div";
				
				if (item.tags && item.tags != "") {
					$("#tags" + item.id).html(tagsHtml);
				}
			}
			
			$(core.region).fadeIn();
			core.attachEventHandlers();
			$(window).trigger('resize');
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
			var baseLayoutHeight = 10;
			var targetLayoutHeight = $(core.region).height() + 100;
    		$('#layout').animate({height: targetLayoutHeight});
			$('#rightPart').animate({height: targetLayoutHeight-30});
			if (cb) cb();
		}
	};
	
	return core;
}