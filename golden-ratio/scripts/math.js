Math.descend = function(times, value) {
	var start = value;
	
	for(var idx = 0; idx < times; idx ++)
		start = start / ratio;
		
	return Math.round(start * 100) / 100;
};
