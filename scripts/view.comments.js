var ik = ik || {};

$(function () {
	ik.view = ik.view || {};
	ik.view.comments = ik.view.comments || {
		make: function (entryid) {
			var core = ik.view.make();
			var enterCallBack = null;
			
			core.name = 'latestComments';
			core.template = 'latestCommentsTemplate';
			core.entryid = entryid;
			
			core.onEnterRegion = function (callback) {
				enterCallBack = callback;
				
				$.ajax({
					url: 'template/latestComments.html',
					dataType: 'html',
					success: function (data, textStatus, jqXHR) {
						$('body').append(data);
						$('#' + core.template) 
							.template(core.template);
		
						$.ajax({
							url: 'app_v2/comments/latest/' + core.entryid,
							dataType: 'json',
							success: core.loadDataComplete});
					}});
			};
			
			core.onLeaveRegion = function (callback) {
				core.detachEventHandlers();
				$(core.region).fadeOut("fast", callback);
			};
			
			core.loadDataComplete = function (data, textStatus, jqXHR) {
				$(core.region).hide().html('');
				if (!data.length) return;
				$.tmpl(core.template, data).appendTo($(core.region));
				$(core.region).fadeIn();				
				core.attachEventHandlers();
				
				if (enterCallBack) enterCallBack();
			};
			
			core.attachEventHandlers = function () {};
			
			core.detachEventHandlers = function () {};
			
			core.handlers = {};
			
			return core;
		}
	}
});