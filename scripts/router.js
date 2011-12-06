function Router() {
	var core = new Dynamic();
	var relativePath = '';
	
	core.getRelativePath = function () {
		return relativePath;
	};
	
	core.map({
		updateView: function () {
			//
		}
	});
	
	$(window).hashchange(function () {
		var path = 
			location.hash.indexOf("#!") == 0 ? 
				location.hash.substring(2) :
				location.hash.substring(1) ;
		
		console.log(path);
		
		updateDecision = relativePath != path;
		relativePath = path;
		
		if (updateDecision)
			core.updateView();
	});
	
	return core;
}
