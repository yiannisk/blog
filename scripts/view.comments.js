var ik = ik || {};

$(function () {
	ik.view = ik.view || {};
	ik.view.comments = ik.view.comments || {
		make: function (entryid) {
			var core = ik.view.make();
			var enterCallBack = null;
			
			core.name = 'latestComments';
			core.mainTemplate = 'latestCommentsTemplate';
			core.entryid = entryid;
			
			core.onEnterRegion = function (callback) {
				enterCallBack = callback;
				core.template2('latestComments', function () {
					$.ajax({
						url: 'app_v2/comments/latest/' + core.entryid,
						dataType: 'json',
						success: core.loadDataComplete
					});
				});
			};
			
			core.onLeaveRegion = function (callback) {
				core.detachEventHandlers();
				$(core.region).fadeOut("fast", callback);
			};
			
			core.loadDataComplete = function (data, textStatus, jqXHR) {
				$(core.region).hide().html('');

				//if (!data.length) return;
				console.log({Comments: data});
				core.templates.latestComments.apply({Comments: data}, 
					function (rendered) {
						$(core.region).html(rendered).fadeIn();
						core.attachEventHandlers();
						if (enterCallBack) enterCallBack();
					});
			};
			
			core.attachEventHandlers = function () {};
			core.detachEventHandlers = function () {};
			
			core.handlers = {};
			
			return core;
		}
	}
});