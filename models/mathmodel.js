function MathModel() {
	var core = new Model();
	core.resource = 'math';
	core.mapMethod('question', false, 'text');
	core.mapMethod('answer', false, 'text');
	return core;
}
