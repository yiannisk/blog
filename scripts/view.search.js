var ik = ik || {};

$(function () {
	ik.view = ik.view || {};
	ik.view.search = ik.view.search || {
		make: function (id) {
			var core = ik.view.make();
			var enterCallBack = null;
			
			core.name = 'search';
			
			core.template = 'entrySearchTemplate';
			core.resultsTemplate = 'entrySearchResultsTemplate';
			
			core.id = id;
			
			core.onEnterRegion = function (callback) {
				enterCallBack = callback;
				
				$.ajax({
					url: "template/entrySearch.html",
					dataType: "html",
					success: function (data, textStatus, jqXHR) {
						$('body').append(data);
						$('#' + core.template)
							.template(core.template);
							
						$(core.region).hide().html('');
						$.tmpl(core.template, data)
							.appendTo($(core.region));			
						
						
						$(core.region).fadeIn();
						core.adjustMagnifyingLensPosition();
						
						core.attachEventHandlers();
						if (enterCallBack) enterCallBack();
					}});
			};
			
			core.onLeaveRegion = function (callback) {
				core.detachEventHandlers();
				$(core.region).fadeOut('fast', callback);
			};
			
			core.onMessageReceived = function (message, callback) {
				if (message == 'HEADER_HIDDEN')
					core.adjustMagnifyingLensPosition();
				
				if (callback) callback();
			}
			
			core.loadComplete = function (data, textStatus, jqXHR) {
				$(core.region)
					.html(data)
					.hide()
					.fadeIn();
				
				core.adjustMagnifyingLensPosition();
				core.attachEventHandlers();

				if (enterCallBack) enterCallBack();
			};
			
			core.searchForText = function (text) {
				$('.searchItem').unbind('hover');
				$('#magnifyingLens').addClass('loading');
				$('#searchResults').fadeOut().html('');
				$.ajax({
					url: 'app_v2/entry/search/' + text,
					dataType: 'json',
					success: core.handlers.searchSuccess});
			};
			
			core.adjustMagnifyingLensPosition = function () {
				$('#magnifyingLens').css('left', 
					$('#searchText').position().left 
						+ $('#searchText').outerWidth()
						- $('#magnifyingLens').width()
						-3 
						+ 'px');
						
				$('#magnifyingLens').css('top', 
					$('#searchText').position().top 
						+ $('#searchText').outerHeight() 
						- $('#magnifyingLens').width() 
						-3 
						+ 'px');
			}
			
			core.attachEventHandlers = function () {
				$('#searchText')
					.bind('focus', core.handlers.searchTextFocus)
					.bind('blur', core.handlers.searchTextBlur)
					.bind('keyup', core.handlers.searchTextKeyUp);
			};
			
			
			core.detachEventHandlers = function () {
				$('#searchText')
					.unbind('focus')
					.unbind('blur')
					.unbind('keyup');
			};
			
			core.handlers = {
				searchTextFocus: function (evt) {
					if (evt.currentTarget.value == 'Search this site...')
						evt.currentTarget.value = '';
						
					$(evt.currentTarget).removeClass('inactive');
				},
				
				searchTextBlur: function (evt) {
					if (evt.currentTarget.value == '') {	
						evt.currentTarget.value = 'Search this site...';
						$(evt.currentTarget).addClass('inactive');
					}
				},
				
				searchTextKeyUp: function (evt) {
					if (evt.currentTarget.value != '')
					{	
						$('#searchHint').fadeIn();
						$('#magnifyingLens').removeClass('inactive');
						$('#magnifyingLens').bind('click', 
							core.handlers.magnifyingLensClick);
					} 
					else
					{
						$('#searchHint').fadeOut();
						$('#magnifyingLens').addClass('inactive');
						$('#magnifyingLens').unbind('click');
					}
					
					if (!$(evt.currentTarget).hasClass('inactive'))
						if (evt.originalEvent.keyCode == 13)
							core.searchForText(evt.currentTarget.value);
				},
				
				searchSuccess: function(data, textStatus, jqXHR) {
					$('#magnifyingLens').removeClass('loading');
					var searchData = data;
					
					$.ajax({
					url: "template/entrySearchResults.html",
					dataType: "html",
					success: function (data, textStatus, jqXHR) {
						$('body').append(data);
						$('#' + core.resultsTemplate)
							.template(core.resultsTemplate);
							
						$.tmpl(core.resultsTemplate, searchData)
							.appendTo('#searchResults');			
						
						$('#searchResults').fadeIn();
						
						$('.searchItem')
							.hover(core.handlers.searchItemIn,
								core.handlers.searchItemOut);
								
						$('.searchItem')
							.click(core.handlers.searchItemClick);
					}});
				},
				
				searchItemIn: function (evt) {
					$(evt.currentTarget).animate(
						{backgroundColor: '#333333'}, 'fast');
				},
				
				searchItemOut: function (evt) {
 					$(evt.currentTarget).animate(
						{backgroundColor: '#06A8F9'}, 'fast');
				},
				
				searchItemClick: function (evt) {
					var id = evt.currentTarget.id.substring(10);
					layout.draw(ik.view.post.make(id), 'leftPartContents');
				},
				
				magnifyingLensClick: function (evt) {
					core.searchForText($('#searchText').val());
					return false;
				}
			};
			
			return core;
		}
	};
});