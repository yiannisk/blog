function Route(pattern, action) {
	this.pattern = pattern;
	this.action = action;
	this.applies = function (str) {
		var s = str;
		this.pattern.compile(this.pattern);
		if (this.pattern.exec(s) != null) {
			this.action();
			return true;
		}
		
		return false;
	}
}

function Router() {
	var core = new Dynamic();
	
	core.relativePath = '';
	
	core.routes = [
		new Route(/^post./gi, function () {
			layout.draw(
				new PostView(core.relativePath.substring(5)),
				"leftPartContents");
		}),
		
		new Route(/^.{0}$/, function () {
			layout.draw(new PostListView(), "leftPartContents");
		}),
		
		new Route(/^profile$/, function () {
		    setTimeout(function () {$("#logo").click();}, 500); 
		})
	];
 
 	core.getHash = function () {
		return location.hash.indexOf("#!") == 0 ? 
			location.hash.substring(2) :
			location.hash.substring(1) ;
	};
	
	core.map({
		updateView: function () {
			for(var idx in core.routes)
				if (core.routes[idx].applies(core.relativePath))
					break;
		}, 
		
		initialize: function () {
			$(window).hashchange();
		}
	});
	
	$(window).hashchange(function () {
		core.relativePath = (core.getHash() || "").trim();
		core.updateView();
	});
	
	return core;
}
