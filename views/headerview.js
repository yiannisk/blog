function HeaderView() {
	var core = new View();
	var enterCallBack = null;
	
	core.name = 'header';
	core.model = new StaticModel();
	
	core.onEnterRegion = function (callback) {
		enterCallBack = callback;
		
		core.template('header', function () {
			core.model.single('header', core.loadDataComplete);
		});
		
		setTimeout(core.handlers.closeIconClick, 20000);
	};
	
	core.onLeaveRegion = function (callback) {
		core.detachEventHandlers();
		$(region).fadeOut("fast", callback);
	};
	
	core.onMessageReceived = function (message, callback) {
	    if (message == 'ADMIN_MODE') {
	        if (!$("#header").is(":visible")) {
	            console.log("Displaying header...");
	            $("#header").fadeIn('fast');
	            $(window).trigger('resize');
	        }
	        
	        $("#closeIcon").fadeOut();
	        $("#headerLogo").addClass("adminLogo");
	    }
	};
	
	core.loadDataComplete = function (data, textStatus, jqXHR) {
		core.templates.header.apply(data, function (data) {
			$(core.region).hide().html('');
			$(data).appendTo($(core.region));
			$(core.region).fadeIn();
			core.attachEventHandlers();
			if (enterCallBack) enterCallBack();
		});
	};
	
	core.attachEventHandlers = function () {
		$("#closeIcon").bind('click', core.handlers.closeIconClick);
		$("#headerLogo").bind('click', core.handlers.headerLogoClick);
	};
	
	core.detachEventHandlers = function () {
		$("#closeIcon").unbind('click');
		$("#headerLogo").unbind('click');
	};
	
	core.handlers = {
		closeIconClick: function (evt) {
			$("#header").fadeOut(function () {
				layout.sendMessage("search","HEADER_HIDDEN");
			});
		},
		
		// TODO: Change this into a link.
		headerLogoClick: function () { location.hash = "#"; }
	};
	
	return core;
}
