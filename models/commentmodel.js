function CommentModel() {
	var core = new Model();
	core.resource = 'comment';
	core.mapMethod('latest');
	return core;
}
