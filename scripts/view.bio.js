var ik = ik || {};

$(function () {
	ik.view = ik.view || {};
	ik.view.bio = ik.view.bio || {
		make: function () {
			var core = ik.view.make();
			core.name = 'bio';
			core.template = 'bioTemplate';
			core.sideTemplate = 'bioSideTemplate';
			core.showSearch = false;
			core.showComments = false;
			
			core.onEnterRegion = function (callback) {
				$.ajax({
						url: 'template/bioSide.html',
						dataType: 'html',
						success: function (data, textStatus, jqXHR) {
							$('body').append(data);
							$('#' + core.sideTemplate) 
								.template(core.sideTemplate);
						}});
			
				$.ajax({
						url: 'template/bio.html',
						dataType: 'html',
						success: function (data, textStatus, jqXHR) {
							$('body').append(data);
							$('#' + core.template) 
								.template(core.template);
								
							$.tmpl(core.template, data)
								.appendTo($(core.region));
							
							core.attachEventHandlers();
						}});
			};
			
			core.onLeaveRegion = function (callback) {
				core.detachEventHandlers();
			};
			
			core.attachEventHandlers = function () {
				$("#logo").click(core.handlers.logoClick);
				$(".bioClose").click(core.handlers.bioCloseClick);
			};
			
			core.detachEventHandlers = function () {
				$("#bio").unbind();
			};
			
			core.handlers = {
				logoClick: function () {
					$(core.region).css({
						height: $('#layout').innerHeight() + "px",
						left: ($('#layout').position().left
							- 126
							+ (($('#layout').outerWidth() - 550) / 2)) 
							+ "px"
					});
						
					$(core.region).fadeIn("slow");
					
					core.showSearch = $("#search").is(":visible");
					core.showComments = $("#comments").is(":visible");
					
					if (core.showSearch)
						$("#search").fadeOut("fast");
						
					if (core.showComments)
						$("#comments").fadeOut("fast");
					
					$("#bioSide").html(
						$.tmpl(core.sideTemplate, null));

					$("#bioSide").fadeIn("slow");
				},
				
				bioCloseClick: function () {
					$("#bioSide").fadeOut("fast");
					$(core.region).fadeOut("fast");
					
					if (core.showSearch)
						$("#search").fadeIn("slow");
						
					if (core.showComments)
						$("#comments").fadeIn("slow");
				}
			};
			
			return core;
		}
	}
});