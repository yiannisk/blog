(function ($) {
	$.extend(jQuery.tmpl.tag, {
		'unixdate': {
			_default: { $1: "Please enter some text..." },
			open: 'var newDate = new Date(); ' 
				+ 'newDate.setTime($1*1000);'
				+ 'dateString = newDate.format("dd/mm/yyyy HH:MM");'
				+ '_=_.concat(dateString);'
		}
	});
})(jQuery);