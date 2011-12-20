function PostView(id) {
	var core = new View();
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
					url: "app/entry/single/" + core.id,
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
		$(core.region).hide().html('');
		$.tmpl(core.template, data).appendTo($(core.region));
		
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
		$('#rightPart').css('height', (targetLayoutHeight - 30) + 'px');
			
		core.attachEventHandlers();
		layout.draw(new CommentsView(id), "comments");
		if (enterCallBack) enterCallBack();
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
