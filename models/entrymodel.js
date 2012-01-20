function EntryModel() {
	var core = new Model();
	core.resource = 'entry';
	core.mapMethod('latest');
	core.mapMethod('single');
	core.mapMethod('search');
	return core;
}
