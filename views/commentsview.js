function CommentsView(entryid) {
	var core = new View();
	var enterCallBack = null;
	
	core.name = 'latestComments';
	core.entryid = entryid;
	core.images = [];
	core.model = new CommentModel();
	core.mathModel = new MathModel();
	
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
			core.model.latest(core.entryid, core.loadDataComplete);
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
		$("a.addComment").bind('click', core.handlers.addCommentClick);
	};
	
	core.detachEventHandlers = function () {
		// how to remove the colorbox?
	};
	
	core.validateForm = function () {
		var email = $('#email').val();
		var emailPattern = /^[\w\.\+]+\@{1}[\w\.\+]+$/gi;
		if (email == null || email.length == 0 
			 || !email.match(emailPattern)) {
			
			$('#email').addClass('invalid');
			$('#email').val('Please provide a valid email.');
			$('#email').focus(function (evt) {
				$(this).val('');
				$(this).removeClass('invalid');
				$(this).unbind();
			});
		
			return false;
		}
		
		var comment = $('#comment').val();
		if (comment == null || comment.length == 0) {
			$('#comment').addClass('invalid');
			$('#comment').val("Don't be shy, write something.");
			$('#comment').focus(function (evt) {
				$(this).val('');
				$(this).removeClass('invalid');
				$(this).unbind();
			});
			
			return false;
		}
		
		return true;
	};
	
	core.handlers = {
		colorboxComplete: function () {
			$('#comment').bind(
				'keypress keyup keydown change', 
				core.handlers.commentChange);
			
			$('#noButton').bind('click',
				core.handlers.noButtonClick);
			
			$('#yesButton').bind('click',
				core.handlers.yesButtonClick);
		},
		
		addCommentClick: function (evt) {
			evt.stopPropagation();
			
			console.log(core.mathModel.question);
			core.mathModel.question(function (data) {
				console.log(data);
				$("#questionBox #answer").html(data);
				
				$.colorbox({
					html:$("#addCommentContainer").html(),
					width: '410px',
					height: '430px',
					onComplete: core.handlers.colorboxComplete
				});
			});
			
			return false;
		},
		
		commentChange: function () {
			if ($(this).val().length > 500)
				$(this).val($(this).val().substring(0,500));
			
			$("#textCounter").html(
				$(this).val().length + " / 500"
			);
		},
		
		noButtonClick: function (evt) {
			if (!core.validateForm()) return false;
			evt.stopPropagation();
			core.mathModel.answer("false", core.handlers.answerSuccess);
			return false;
		},

		yesButtonClick: function (evt) {
			if (!core.validateForm()) return false;
			evt.stopPropagation();
			core.mathModel.answer("true", core.handlers.answerSuccess);
			return false;
		},

		answerSuccess: function (data) {
			if (data == 'success') {
				core.model.post({
						entryId: core.entryid,
						author: $("#email").val(),
						contents: $("#comment").val()
					}, 'text', function() {
						if (data != 'success') return;
						core.model.latest(core.entryid, 
							core.loadDataComplete);
					});

				return;
			}
			
			core.mathModel.question(function (data) {
				$("#questionBox #answer").html(data);
			});
		}
	};
	
	return core;	
}
