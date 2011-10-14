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
			core.images = [];
			
			core.onEnterRegion = function (callback) {
				// preload the button images for the
				// add comment dialog.
				var imgs = [
					"resources/buttonIn.png",
					"resources/buttonOut.png",
					"resources/commentsBackground.jpg"
				];
				
				for(var i = 0; i < imgs.length; i++) {
					var img = new Image();
					img.src = imgs[i];
					core.images.push(img);
				}
					
			
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
				core.templates.latestComments.apply({Comments: data}, 
					function (rendered) {
						$(core.region).html(rendered).fadeIn();
						core.attachEventHandlers();
						if (enterCallBack) enterCallBack();
					});
			};
			
			core.attachEventHandlers = function () {
				$("a.addComment").colorbox(
					{inline: true, width: "410px", height: "430px"});
			};
			
			core.detachEventHandlers = function () {
				// how to remove the colorbox?
			};
			
			core.handlers = {
			};
			
			return core;
		}
	}
});