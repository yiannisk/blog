function DynamicTests() {
	this.canMap = function () {
		var d = new Dynamic();
		d.map({ funcA: function () { console.log("funcA ok"); }});
		return d.funcA != null;
	};
	
	this.canInvokeMapping = function () {
		var d = new Dynamic();
		d.map({ funcA: function () { console.log("funcA ok"); }});
		d.funcA();
	}
}