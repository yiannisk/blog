function View() {
	var core = new Dynamic();
	
	core.region = null;
	core.name = 'baseView';
	core.templates = {};
	core.templatePrefix = 'Template';
	core.templateBase = 'template/';
	
	core.templateName = function (name) {
		return name + core.templatePrefix;
	};
	
	core.map({
		enter: function (callback) {
			if (this.onEnterRegion) 
				this.onEnterRegion(callback);
			else if (callback) callback();
		},
			
		leave: function (callback) {
			if (this.onLeaveRegion) 
				this.onLeaveRegion(callback);
			else if (callback) callback();
		},
		
		template: function (name, callback) {
			core.templates[name] = new Template(name);
			core.templates[name].load(callback);
		},
			
		message: function (message, callback) {
			if (this.onMessageReceived) 
				this.onMessageReceived(message, callback);
			else if (callback) callback();
		},
	});
	
	return core;
}
