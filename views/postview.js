function PostView(id) {
	var core = new View();
	var enterCallBack = null;
	
	core.name = "post";
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
			core.attachEventHandlers();
			layout.draw(new CommentsView(id), "comments");
			$(window).trigger('resize');
			if (enterCallBack) enterCallBack();
		});
	};
	
	core.attachEventHandlers = function () {
		$(".backtotop").click( core.handlers.backToTopClick );
		$(window).resize(core.handlers.resizeBaseLayout);
	};
	
	core.detachEventHandlers = function () {
		$(".backtotop").unbind("click");
	};
	
	core.handlers = {
		backToTopClick: function (evt) {
			evt.stopPropagation();
			window.toTop();
			return false;
		},
		
		resizeBaseLayout: function (evt, callback) {
            var cb = callback;
            var baseLayoutHeight = 10;
            
            var targetLayoutHeight = 
                 $(core.region).height() + 100;
            
            $('#layout').clearQueue()
                .animate({height: targetLayoutHeight});
            
            $('#rightPart').clearQueue()
                .animate({height: targetLayoutHeight-30});
            
            if (cb) cb();
        }
	};
	
	return core;
}
