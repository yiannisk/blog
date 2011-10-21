var ik = ik || {};

$(function () {
	ik.template = ik.template || {
		postfix: 'Template',
		base: 'template/',
		make: function (name) {
			if (!name || name.length == 0)
				throw new Error('Template name cannot be null.');
		
			var core = ik.dynamic.make();
			
			core.shortName = name;
			core.longName = core.shortName + ik.template.postfix;
			core.path = ik.template.base + core.shortName + '.html';
			
			core.map({
				load: function (callback) {
					var cb = callback;
					if ($.template[core.longName])
					{
						if (cb) cb();
						return;
					}
					
					core.ajax({
						url: core.path,
						dataType: 'html',
						success: function (data, textStatus, jqXHR) {
							$('body').append(data);
							$('#' + core.longName).template(core.longName);
							if (cb) cb();
						}
					});
				},
				
				apply: function (data, callback) {
					var d = data;

					if (!$.template[core.longName])
						throw new Error('Template can\'t be found.');
					
					if (callback)
						callback($.tmpl(core.longName, d));
				}
			});
			
			return core;
		}
	};
});