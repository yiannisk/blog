function Model() {
	var items = {};
	var core = new Dynamic();

	core.resourcesBase = 'app';
	
	core.map({
		post: function (data, type, callback) {
			var callback = callback;
			
			var resourceUri = core.resourcesBase
				 + "/" + core.resource;
				 
			core.ajax({
				url: resourceUri,
				type: "POST",
				dataType: type || "json",
				data: data,
				success: function (data) {
					if (callback) callback(data);
				}
			});
		}
	});
	
	core.mapMethod = function (method, cacheable, dataType) {
		var method = method, obj = {}, 
			cacheable = cacheable == null ? true : cacheable,
			dataType = dataType || 'json';

		obj[method] = function () {
			var args = [], callback = null;
				
			for(var i = 0; i < arguments.length; i++)
				args.push(arguments[i]);
			
			if (args.length > 0 
				&& typeof args[args.length - 1] == "function")
				callback = args.pop();
			
			if (!core.resource)
				throw new Error("resource is null or undefined.");
			
			var resourceUri = core.resourcesBase
				 + "/" + core.resource
				 + "/" + method;
			
			for(var i = 0; i < args.length; i++)				 
				 resourceUri += "/" + args[i];
			
			if (cacheable && items[resourceUri]) {
				if (callback) callback(items[resourceUri]);
				return;
			}
			
			core.ajax({
				url: resourceUri,
				dataType: dataType,
				success: function (data) {
					if (cacheable)
						items[resourceUri] = data;
						
					if (callback) callback(data);
				}
			});
		};
		
		core.map(obj);
	};
	
	return core;
}
