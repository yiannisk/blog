function PostListView() {
	var core = new View();
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
					url: "app_v2/entry/latest",
					dataType: "json",
					success: core.loadDataComplete});
			}});
	};
	
	core.loadDataComplete = function (data, textStatus, jqXHR) {
		$(core.region).hide().html('');
		$.tmpl(core.template, data).appendTo($(core.region));
		
		for(var index in data) {
			var item = data[index];
			if (item.contents == "") {
				$("#readmore" + item.code).hide();
			}
			
			if (item.tags && item.tags != "") {
				$("#tags" + item.id).html(
					"<div class='tag'>"
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
