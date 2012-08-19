function AdminView() {
	var core = new View();
	var showLogin = false;
	var loggedIn = false;
	
	core.onEnterRegion = function (callback) {
		$(window).bind('keyup', core.windowKeyUp);
	};
	
	core.windowKeyUp = function (evt) {
		if (evt.altKey && evt.shiftKey && evt.ctrlKey
			&& String.fromCharCode(evt.keyCode) == 'L')
			core.toggleAdminLogin();
	};
	
	core.toggleAdminLogin = function () {
		if (loggedIn) return;
		
		showLogin = !showLogin;
		
		if (showLogin) {
			core.template('adminLogin', function () {
				core.templates.adminLogin.apply({}, 
					function (rendered) {
						$.colorbox({
						    html: rendered,
						    width: "330px",
						    height: "190px",
						    onComplete: function () {
						        $("#username").trigger('focus');
						    }
						});
						
						$("#doLogin").click(function () {
						    $.ajax({
						      type: "POST",
						      url: "app/login",
						      data: "username=" + $("#username").val() 
						         + "&password=" + $("#password").val(),
						      success: function (data) {
						          loggedIn = true;
						          setTimeout($.colorbox.close, 100);
						          $("#closeIcon").fadeOut();
						          layout.sendMessage("header", "ADMIN_MODE");
						      },
						      error: function () {}
						   }); 
						});
					});
			})
		} else {
			$(core.region).hide().html('');
		}
	}
	
	core.onLeaveRegion = function (callback) {
		$(window).unbind('keyup', core.windowKeyUp);
	};
	
	return core;
}
