/// <summary>
/// The application main file. Initializes configuration, loads scripts
/// and invokes a number of notification events on the main window.
/// <raises>Application:Start, Application:IsConfigured, 
///   Application:ScriptsLoaded</raises>
/// </summary>
(function () {
	if (!$) throw new Error("This script requires jquery.");
	
	$(window).bind("Application:Start", function () {
		console.log("Application:Start");
	});
	
	$(window).bind("Application:IsConfigured", function () {
		console.log("Application:IsConfigured");
	});
	
	$(window).bind("Application:ScriptsLoaded", function () {
		console.log("Application:ScriptsLoaded");
	});

	$(window).bind("Application:ViewsLoaded", function () {
		console.log("Application:ViewsLoaded");
	});
	
	$(window).bind("Application:WindowResized", function (evt, dims) {
		console.log("Application:WindowResized", evt, dims);
	});
	
	$(window).bind("Application:HashChange", function (evt, hash) {
		console.log("Application:HashChange", evt, hash);
	});
	
	$(window).bind("Application:ModelsLoaded", function (evt) {
		console.log("Application:ModelsLoaded");
	});
	
	$(window).bind("Application:Ready", function (evt) {
		console.log("Application:Ready");
	});

	$(window).trigger("Application:Start");

	///////////////////////////////////////////// Scripts
	var loadSequence = new Sequence();
	loadSequence.loadScriptCollection = function (evt, bse, lst, seq) {
		var evt = evt, bse = bse, lst = lst, seq = seq;
		var join = new Join(function() {
			$(window).trigger(evt);
			seq.resume();
		});
		
		for(var index = 0; index < lst.length; index ++) {
			var script = bse + lst[index] + ".js";
			var handle = join.add();
			$.getScript(script, function (data, textStatus) {
				handle();
			});
		}
		
		seq.hold();
	};

	loadSequence.map({
		configure: function () {
			$.getJSON("config.json", function (data) {
				$.extend(window, data);
				$(window).trigger("Application:IsConfigured");
				loadSequence.resume();
			});
			
			loadSequence.hold();
		},
		
		loadScripts: function () {
			loadSequence.loadScriptCollection(
				"Application:ScriptsLoaded", ScriptsBase, Scripts, 
				loadSequence);
		},
		
		loadViews: function () {
			loadSequence.loadScriptCollection(
				"Application:ViewsLoaded", ViewsBase, Views, 
				loadSequence);
		},
		
		loadModels: function () {
			loadSequence.loadScriptCollection(
				"Application:ModelsLoaded", ModelsBase, Models, 
				loadSequence);
		},
		
		initialize: function () {
			// further bootstrapping should go here.
			
			// this invocation should happen at the end of everything.
			$(window).trigger("Application:Ready");
		}
	});
	
	loadSequence
		.configure()
		.loadScripts()
		.loadModels()
		.loadViews()
		.initialize();
})();
