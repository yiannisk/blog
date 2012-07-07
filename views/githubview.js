function GitHubView() {
	var core = new View();
	var enterCallBack = null;
	
	core.name = 'github';
	core.model = new GitHubModel();
	
	core.onEnterRegion = function (callback) {
		enterCallBack = callback;
		
		core.template('github', function () {
			core.model.repos(core.loadDataComplete);
		});
	};
	
	core.loadDataComplete = function (data, textStatus, jqXHR) {
		var data = data.data;
		for(var i = 0; i < data.length; i++)
			data[i].full_name = 
				data[i].full_name.replace('yiannisk/', '');
		
		core.templates.github.apply(data, function (tplData) {
			$(core.region).hide().html('');
			$(tplData).appendTo($(core.region));
			$(core.region).fadeIn();
		});
	};
	
	return core;
}