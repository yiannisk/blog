var fs = require("fs");
var url = phantom.args[0];
var file = phantom.args[1];
var page = new WebPage();

page.open(url, function (status) {
	console.log(status);
	if (status == "success") {
		window.setTimeout(function () {
			fs.write(file, page.content, "w");
			phantom.exit(); 
		}, 5000);
	} else phantom.exit();
});
