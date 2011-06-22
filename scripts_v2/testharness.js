function TestHarness(testsObject) {
	this.testsObject = testsObject;
	
	this.run = function(testName) {
		if (testName)
			this.test(testName);
		else
			for(testMethod in testsObject)
				this.test(testMethod);
	};
	
	this.test = function(testMethod) {
		var result = false;
		var exception = null;
		try {
			result = this.testsObject[testMethod]();
		} catch (err) {
			exception = err;
			result = false;
		}
		
		if (result)
			console.log(testMethod + " passed.");
		else {
			console.log(testMethod + " failed.");
			if (exception != null) 
				console.log(exception);
		}
	};
}