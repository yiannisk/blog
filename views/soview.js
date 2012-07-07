function StackOverflowView() {
	var core = new View();
	var enterCallBack = null;
	
	core.name = "stackoverflow";
	core.model = new StackOverflowModel();
	
	core.onEnterRegion = function (callback) {
		enterCallBack = callback;
		core.template('stackoverflow', function () {
			core.model.profile(core.loadDataComplete);
		});
	};
	
	core.loadDataComplete = function (data) {
		core.templates.stackoverflow.apply(data.items, 
			function (tplData) {
				$(core.region).hide().html('');
				$(tplData).appendTo($(core.region));
				$(core.region).fadeIn();
			});
	};
	
	return core;
}
