function MiscellaneousUtilities() {
	this.Preload = function (imageUrl, callback) {
		$.ajax({
			url: imageUrl,
			complete: callback
		});
	};
}

var Utils = new MiscellaneousUtilities();