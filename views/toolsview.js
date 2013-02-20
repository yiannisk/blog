function ToolsView() {
    var core = new View();
    var enterCallBack = null;
    var selectedFontSize = 'large';
    
    core.name = "tools";
   
    core.onEnterRegion = function (callback) {
        core.region = $("<div id='tools' class='tools'></div>")
            .appendTo("body")[0];
        core.handlers.adjustPanelPosition();
        $(core.region).fadeIn("slow");
        $("<div class='letterSize selectedLetter selected'>A</div>"
            + "<div class='letterSize small'>A</div>"
            + "<div class='letterSize medium'>A</div>"
            + "<div class='letterSize large selected'>A</div>"
            + "<div class='hidden selectedLetterLabel'>Letter Size</div>")
            .appendTo($(core.region));
            
        core.addEventHandlers();
        $(core.region).css("z-index", "10");
    };
    
    core.onLeaveRegion = function (callback) {
        $(core.region).remove();
    }
    
    core.addEventHandlers = function () {
        $(".letterSize.selectedLetter")
            .mouseover(core.handlers.selectedLetterIn);
        
        $(".letterSize").mouseout(core.handlers.stopDead);
        
        $(".letterSize:not(.selectedLetter)")
            .click(core.handlers.letterSizeClick);
        
        $(".tools").mouseout(core.handlers.toolsOut);
        
        $(window).resize(core.handlers.adjustPanelPosition);
    }
    
    core.handlers = {
        adjustPanelPosition: function () {
            $(core.region).css({
               left: $("#rightPart").position().left 
                        - $(core.region).width()
                        - 40});
        },
        
        selectedLetterIn: function (evt) {
            $(".tools").addClass("background");
            $(".tools .selectedLetterLabel").removeClass("hidden");
            $(".tools").find(".letterSize").fadeIn("fast");
        },
        
        toolsOut: function (evt) {
            $(".tools").removeClass("background");
            $(".tools .selectedLetterLabel").addClass("hidden");
            $(".tools")
                .find(".letterSize:not(.selectedLetter)")
                .fadeOut("fast");
        },
        
        stopDead: function (evt) {
            evt.stopPropagation();
            return false;
        },
        
        letterSizeClick: function (evt) {
            // clear applied styles.
            $('head [href*="' + selectedFontSize + '"]').remove();
            $(".selectedLetter").removeClass(selectedFontSize);
            
            // set selected class.
            $(".tools").find(".letterSize").removeClass("selected");
            $(this).addClass("selected");
            
            // get selected size into state.
            var newSelectedFontSize = $(this).hasClass("large")
                ? "large"
                : $(this).hasClass("medium")
                    ? "medium"
                    : "small";
            
            selectedFontSize = newSelectedFontSize;
            
            // load css file.
            core.loadCss(selectedFontSize);
            
            // refresh the layout.
            setTimeout(function(){$(window).trigger('resize');}, 1);
        }
    };
    
    core.loadCss = function (css) {
        var cssFile = "styles/" + css + "Letters.css";
        $('head').append(
            $('<link rel="stylesheet" type="text/css" />')
                .attr('href', cssFile));
    };
    
    return core;
}
