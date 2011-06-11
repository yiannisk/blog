var ik = ik || {};

$(function () {
	ik.view = ik.view || {};
	ik.view.search = ik.view.search || {
		version: "0.02.000",
		make: function (id) {
			var core = ik.view.make();
			var enterCallBack = null;
			
			core.name = "search";
			core.id = id;
			
			core.onEnterRegion = function (callback) {
				enterCallBack = callback;
				$.ajax({
					url: "app/?i=search",
					success: core.loadComplete});
			};
			
			core.onLeaveRegion = function (callback) {
				core.detachEventHandlers();
				$(core.region).fadeOut("fast", callback);
			};
			
			core.loadComplete = function (data, textStatus, jqXHR) {
				$(core.region)
					.html(data)
					.hide()
					.fadeIn();
				
				core.attachEventHandlers();
				if (enterCallBack) enterCallBack();
			};
			
			core.attachEventHandlers = function () {
				$("#searchText")
					.bind('focus', core.handlers.searchTextFocus)
					.bind('blur', core.handlers.searchTextBlur)
					.bind('keyup', core.handlers.searchTextKeyUp);
			};
			
			
			core.detachEventHandlers = function () {
				$("#searchText")
					.unbind('focus')
					.unbind('blur')
					.unbind('keyup');
			};
			
			core.handlers = {
				searchTextFocus: function (evt) {
					if (evt.currentTarget.value == "Search this site...")
						evt.currentTarget.value = "";
						
					$(evt.currentTarget).removeClass('inactive');
				},
				
				searchTextBlur: function (evt) {
					if (evt.currentTarget.value == "")
						evt.currentTarget.value = "Search this site...";
					
					$(evt.currentTarget).addClass('inactive');
				},
				
				searchTextKeyUp: function (evt) {
					if (evt.currentTarget.value != "")
					{	
						$("#searchHint").fadeIn();
						$("#magnifyingLens").fadeIn();
						
						$("#magnifyingLens").css("left", 
							$("#searchText").position().left 
								+ $("#searchText").outerWidth() 
								- $("#magnifyingLens").width() 
								-3 
								+ "px");
								
						$("#magnifyingLens").css("top", 
							$("#searchText").position().top 
								+ $("#searchText").outerHeight() 
								- $("#magnifyingLens").width() 
								-3 
								+ "px");
					} 
					else
					{
						$("#searchHint").fadeOut();
						$("#magnifyingLens").fadeOut();
					}
				}
			};
			
			return core;
		}
	};
});