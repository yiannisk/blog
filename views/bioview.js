function BioView() {
	var core = new View();
	core.name = 'bio';
	core.showSearch = false;
	core.showComments = false;
	core.supportedHashes = ["profile"];
	
	core.onEnterRegion = function (callback) {
		var cb = callback;
	
		core.template('bioSide', function () {
			core.templates.bioSide.apply(null, function (data) {
				$("#bioSide").hide().html(data);
			})
		});
		
		core.template('bio', function () {
			core.templates.bio.apply(null, function (data) {
				$(data).appendTo($(core.region));
				core.attachEventHandlers();
				core.handlers.adjustPosition();
				if (cb) cb();
			});
		});
	};
	
	core.onLeaveRegion = function (callback) {
		core.detachEventHandlers();
	};
	
	core.attachEventHandlers = function () {
		$("#logo").click(core.handlers.logoClick);
		$(".bioClose").click(core.handlers.bioCloseClick);
		$(window).resize(function () {
		    core.handlers.adjustPosition();
		    core.handlers.resizeBaseLayout();
	    });
	};
	
	core.detachEventHandlers = function () {
		$("#bio").unbind();
	};
	
	core.onMessageReceived = function (message, callback) {
		if (message == 'HEADER_HIDDEN')
			core.handlers.adjustPosition();
		if (callback) callback();
	};

	core.handlers = {
		adjustPosition: function () {
			$(core.region).css({
				height: $('#layout').height() + "px",
				left: ($('#leftPart').position().left + 2) + "px"
			});
		},
		
		logoClick: function () {
            $(core.region).css("z-index", "1000");
			if ($(core.region).is(":visible")) return;
			
			core.showSearch = $("#search").is(":visible");
			core.showComments = $("#comments").is(":visible");

			core.previousLocationHash = location.hash;
			location.hash = "#!profile";
			
			core.handlers.adjustPosition();
			$(core.region).fadeIn("slow");
			
			if (core.showSearch === true)
				$("#search").fadeOut("fast");
				
			if (core.showComments === true)
				$("#comments").fadeOut("fast");

			setTimeout(function () {
				$("#bioSide").fadeIn("slow");}, 150);
		},
		
		bioCloseClick: function () {
			location.hash = core.previousLocationHash;
			
			$("#bioSide").fadeOut("fast");
			$(core.region).fadeOut("fast");
			
			setTimeout(function () {
				if (core.showSearch === true)
					$("#search").fadeIn("slow");
					
				if (core.showComments === true)
					$("#comments").fadeIn("slow");
			}, 150);
		},
		
		resizeBaseLayout: function (evt, callback) {
            var cb = callback;
            var baseLayoutHeight = 10;
            var targetLayoutHeight = $(core.region).height() + 100;
            $('#layout').clearQueue().animate({height: targetLayoutHeight});
            $('#rightPart').clearQueue().animate({height: targetLayoutHeight-30});
            if (cb) cb();
        }
	};
	
	return core;
}