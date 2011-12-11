function Route(pattern, action) {
	this.pattern = pattern;
	this.action = action;
	this.applies = function (str) {
		if (this.pattern.test(str)) {
			this.action();
			return true;
		}
		
		return false;
	}
}

function Router() {
	var core = new Dynamic();
	var relativePath = '';
	var routes = [
		new Route(/^post./gi, function () {
			layout.draw(
				new PostView(relativePath.substring(5)),
				"leftPartContents");
		}),
		
		new Route(/^.{0}$/, function () {
			layout.draw(new PostListView(), "leftPartContents");
		})
	];
	
	core.getRelativePath = function () {
		return relativePath;
	};
	
	core.getHash = function () {
		return location.hash.indexOf("#!") == 0 ? 
			location.hash.substring(2) :
			location.hash.substring(1) ;
	};
	
	core.map({
		updateView: function () {
			for(var route in routes)
				if (routes[route].applies(relativePath))
					return;
		}
	});
	
	$(window).hashchange(function () {
		var path = core.getHash();
		
		updateDecision = relativePath != path;
		relativePath = path;
		
		if (updateDecision) core.updateView();
	});
	
	core.initialize = function () {
		relativePath = core.getHash();
		core.updateView();
	}
	
	return core;
}
