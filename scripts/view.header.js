var ik = ik || {};

$(function () {
	ik.view = ik.view || {};
	ik.view.header = ik.view.header || {
		make:
			function () {
				var core = ik.view.make();
				var enterCallBack = null;
				
				core.name = 'header';
				core.template = 'headerTemplate';
				
				core.onEnterRegion = function (callback) {
					enterCallBack = callback;
					
					$.ajax({
						url: "template/header.html",
						dataType: "html",
						success: function (data, textStatus, jqXHR) {
							$('body').append(data);
							$('#' + core.template) 
								.template(core.template);

						$.ajax({
							url: 'app_v2/static/single/header',
							dataType: 'json',
							success: core.loadDataComplete});
					}});
				};
				
				core.onLeaveRegion = function (callback) {
					core.detachEventHandlers();
					$(region).fadeOut("fast", callback);
				};
				
				
				core.loadDataComplete = function (data, textStatus, jqXHR) {
					$(core.region).hide().html('');
					$.tmpl(core.template, data).appendTo($(core.region));
					$(core.region).fadeIn();
					
					core.attachEventHandlers();
					
					if (enterCallBack) enterCallBack();
				};
				
				core.attachEventHandlers = function () {
					$("#closeIcon").bind('click', core.handlers.closeIconClick);
				};
				
				core.detachEventHandlers = function () {
					$("#closeIcon").unbind('click');
				};
				
				core.handlers = {
					closeIconClick: function (evt) {
						$("#header").fadeOut(
							function () {
								layout.sendMessage("search","HEADER_HIDDEN");
							});
					}
				};
				
				return core;
			}
	};
});