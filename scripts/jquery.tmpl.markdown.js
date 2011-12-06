(function ($) {
	function markdown(str) {
		console.log("markdown!!!", str);
	}
	
	$.extend(jQuery.tmpl.tag, {
		'markdown': {
			_default: { $1: "Please enter some text..." },
			open: 'new Markdown().parse($1);'
		}
	});
})(jQuery);