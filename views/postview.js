function PostView(id) {
	var core = new View();
	var enterCallBack = null;
	
	core.name = "post";
	
	//TODO: Check if commenting the line below will cause problems.
	//core.template = 'entryTemplate';
	
	core.model = new EntryModel();
	core.id = id;
	
	core.onEnterRegion = function (callback) {
		enterCallBack = callback;
		
		core.template('entry', function () {
			core.model.single(core.id, core.loadDataComplete);
		});
	};
	
	core.onLeaveRegion = function (callback) {
		location.hash = "";
		core.detachEventHandlers();
		$(core.region).fadeOut().html('').fadeIn();
		layout.requestRegion('comments');
		if (callback) callback();
	};
	
	core.loadDataComplete = function (data, textStatus, jqXHR) {
		core.templates.entry.apply(data, function (tplData) {
			$(core.region).hide().html('');
			$(tplData).appendTo($(core.region));
			
			if (data.tags && data.tags != "") {
				$("#tags" + data.id).html(
					"<div class='tag'>"
						 + data.tags.replace(/,/gi, 
							"</div><div class='tag'>")
						 + "</div");
			}
			
			$(core.region).fadeIn();
			
			var baseLayoutHeight = 800;
			var targetLayoutHeight = 
				($(core.region).height() > baseLayoutHeight)
					? $(core.region).height() + 100
					: baseLayoutHeight;
				
			$('#layout').css('height', targetLayoutHeight + 'px');
			$('#rightPart').css('height', 
				(targetLayoutHeight - 30) + 'px');
				
			core.attachEventHandlers();
			layout.draw(new CommentsView(id), "comments");
			if (enterCallBack) enterCallBack();
		});
	};
	
	core.attachEventHandlers = function () {
		$(".backtotop").click( core.handlers.backToTopClick );
	};
	
	core.detachEventHandlers = function () {
		$(".backtotop").unbind("click");
	};
	
	core.handlers = {
		backToTopClick: function (evt) {
			evt.stopPropagation();
			window.toTop();
			return false;
		}
	};
	
	return core;
}
