var ik = ik || {};

$(function () {
	ik.debug = ik.debug || {
		version: "0.02.001",
		consoleHeightInPx: 100,

		start: function () {
			this.createConsole();
			
			if ($.SyntaxHighlighter)
				$.SyntaxHighlighter.init({
					wrapLines: true
				});
		},
		
		createConsole: function () {
			if ($("#console").length > 0)
				throw "Some kind of console already exists.";
				
			var hText = "<div id=\"console\" style=\"position: absolute; " 
				+ "bottom: 0px; height: " + this.consoleHeightInPx 
				+ "px; border: 1px solid #999; "
				+ "width: 80%; margin-left: 9%; margin-bottom: 20px; "
				+ "font-family: courier new; font-size: .9em; padding: .2%; "
				+ "background: #ddd; overflow: scroll;\"></div>";
			$("body").append(hText);
		},
		
		write: function (message) {
			if ($("#console").length > 0)
				$("#console").append(message);
		},
		
		writeLine: function (message) {
			if ($("#console").length > 0)
				$("#console").append(message + "<br />"); 
		},
		
		json: function (object) {
			if ($("#console").length > 0 && $.toJSON)
				$("#console").append("<code class=\"highlight\">" 
					+ this.jsonPrettify($.toJSON(object)) + "</code>"); 
			else if ($("#console").length > 0)
				$("#console").append("<code class=\"highlight\">" 
					+ object + "</code>"); 
					
			if ($("#console").syntaxHighlight)
				$("#console").syntaxHighlight();
		},
		
		jsonPrettify: function (json) {
			var output = "";
			var levels = [];
			var singleLevel = { type: "plain", indent: "\t" };
			var childOf = { type: "childOf", indent: "\t" };
			var indentation = "";
			var resolveIndentation = function () {
				var output = "";
				for(var j = 0; j < levels.length; j++)
					output += levels[j].indent;
				return output;
			};
			
			for(var i = 0; i < json.length; i ++) {
				
				if (json[i] == "{" || json[i] == "[") {
					if (i > 0 && json[i - 1] == ":") {
						levels.push(singleLevel);
						indentation = resolveIndentation();
						output += "\n" + indentation + json[i] + "\n";
						levels.push(childOf);
						indentation = resolveIndentation();
						output += indentation;
					} else {
						levels.push(singleLevel);
						output += "\n" + indentation + json[i] + "\n";
						indentation = resolveIndentation();
						output += indentation;
					}
					
					continue;
				}
				
				if (json[i] == "}" || json[i] == "]") {
					var trailIndent = 
						((i + 1) < json.length && json[i + 1] == ",")
							? ""
							: "\n" + indentation;
						
					var last = levels.pop();
					if (last.type == "childOf") {
						indentation = resolveIndentation();
						output += "\n" + indentation + json[i]
							+ trailIndent;
						levels.pop();
						indentation = resolveIndentation();
					} else {
						indentation = resolveIndentation();
						output += "\n" + indentation + json[i]
							+ trailIndent;
					}
					
					continue;
				}
				
				if (json[i] == ",")
				{
					output += json[i] + "\n" + indentation;
					continue;
				}
				
				output += json[i];
			}
			
			return output;
		}
	}
});