function StaticModel() {
	var core = new Model();
	core.resource = 'static';
	core.mapMethod('single');
	return core;
}
