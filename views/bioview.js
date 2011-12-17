function BioView() {
	var core = new View();
	core.name = 'bio';
	core.showSearch = false;
	core.showComments = false;
	core.supportedHashes = ["profile"];
	
	core.onHashRequest = function (hash) {
		if (hash == "profile") $("#logo").click();
	};
	
	core.onEnterRegion = function (callback) {
		var cb = callback;
	
		core.template2('bioSide', function () {
			core.templates.bioSide.apply(null, function (data) {
				$("#bioSide").hide().html(data);
			})
		});
		
		core.template2('bio', function () {
			core.templates.bio.apply(null, function (data) {
				$(data).appendTo($(core.region));
				core.attachEventHandlers();
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
	};
	
	core.detachEventHandlers = function () {
		$("#bio").unbind();
	};
	
	core.handlers = {
		logoClick: function () {
			core.showSearch = $("#search").is(":visible");
			core.showComments = $("#comments").is(":visible");

			location.hash = "#!profile";
			
			$(core.region).css({
				height: $('#layout').innerHeight() + "px",
				left: ($('#layout').position().left
					- 126
					+ (($('#layout').outerWidth() - 550) / 2)) 
					+ "px"
			});
				
			$(core.region).fadeIn("slow");
			
			if (core.showSearch)
				$("#search").fadeOut("fast");
				
			if (core.showComments)
				$("#comments").fadeOut("fast");

			setTimeout(function () {
				$("#bioSide").fadeIn("slow");}, 150);
		},
		
		bioCloseClick: function () {
			location.hash = "";
			
			$("#bioSide").fadeOut("fast");
			$(core.region).fadeOut("fast");
			
			setTimeout(function () {
				if (core.showSearch) {
					$("#search").fadeIn("slow");
				}
					
				if (core.showComments)
					$("#comments").fadeIn("slow");
			}, 150);
		}
	};
	
	return core;
}