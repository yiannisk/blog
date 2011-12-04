$(function () {
	window.HeaderView = Backbone.View.extend({
		el: $("#header"),
		model: new HeaderModel,
		initialize: function () {
		}
	});
});
