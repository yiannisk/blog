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
	
	// deprecated
	core.supportedHashes = [];
	
	// deprecated
	core.canHandle = function (hash) {
		var parts = hash.split(".");
		for(supportedHash in core.supportedHashes)
			if (parts[0] == core.supportedHashes[supportedHash])
				return true;
			
		return false;
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
		
		template2: function (name, callback) {
			core.templates[name] = new Template(name);
			core.templates[name].load(callback);
		},
		
		template: function (name, callback) {
			var prefixedName = name + core.templatePrefix;
			var cb = callback;
			
			if ($.template[name + core.templatePrefix])
			{
				if (cb) cb();
				return;
			}

			core.ajax({
				url: core.templateBase + name + '.html',
				dataType: 'html',
				success: function (data, textStatus, jqXHR) {
					$('body').append(data);
					$('#' + prefixedName).template(prefixedName);
					if (cb) cb();
				}
			});
		},
			
		message: function (message, callback) {
			if (this.onMessageReceived) 
				this.onMessageReceived(message, callback);
			else if (callback) callback();
		},
		
		// deprecated
		hash: function (hashString) {
			var hashParts = hashString.split(".");
			if (this.onHashRequest)
				this.onHashRequest(hashParts[0], hashParts[1]);
		}
	});
	
	return core;
}