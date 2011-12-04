/// <summary>
/// Provides support for application - wide events like HashChange and
/// Resize.
/// </summary>
(function () {
	if (!$) throw new Error("This script requires jquery.");
	var rt;
	$(window).bind('resize', function (evt) {
		clearTimeout(rt);
		var evt = evt;
		var dimensions = { 
			width: $(window).width(),
			height: $(window).height()
		};
		
		rt = setTimeout(function () {
			$(window).trigger("Application:WindowResized", 
				dimensions);
		}, 100);
	});
	
	$(window).bind('hashchange', function () {
		$(window).trigger('Application:HashChange', 
			location.hash.indexOf("#!") == 0
				? location.hash.substring(2)
				: location.hash.indexOf("#") == 0
					? location.hash.substring(1)
					: location.hash);
	});
})();
