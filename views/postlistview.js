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
						 + item.tags.replace(/,/gi, 
							"</div><div class='tag'>")
						 + "</div");
				}
			}
			
			$(core.region).fadeIn();
			
			var baseLayoutHeight = 800;
			var targetLayoutHeight = 
				($(core.region).height() > baseLayoutHeight)
					? $(core.region).height() + 100
					: baseLayoutHeight;
				
			$('#layout').css('height', targetLayoutHeight + 'px');
			$('#rightPart').css('height', 
				(targetLayoutHeight - 30 ) + 'px');
			
			core.attachEventHandlers();
			if (enterCallBack) enterCallBack();
		});
	};
	
	core.onLeaveRegion = function (callback) {
		core.detachEventHandlers();
		$(core.region).fadeOut("fast", callback);
	};
	
	core.attachEventHandlers = function () {
		$(".retweet").hover(
			core.handlers.retweetIn,
			core.handlers.retweetOut);
	};
	
	core.detachEventHandlers = function () {
		$(".retweet").unbind("hover");
	};
	
	core.handlers = {
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
