<html>
	<body>
		<h4>Region 1</h4>
		<div id="region1"></div>
		
		<h4>Region 2</h4>
		<div id="region2"></div>
	
		<script type="text/javascript" src="http://code.jquery.com/jquery-1.5.min.js"></script>
		<script type="text/javascript" src="dynamic.js"></script>
		<script type="text/javascript" src="layout.js"></script>
		<script type="text/javascript" src="view.js"></script>
		<script type="text/javascript" src="views/post.js"></script>
		<script type="text/javascript" src="views/comments.js"></script>
		<script type="text/javascript">
			var layout = new Layout();
			layout.draw(new Post(), "region1");
			
			setTimeout(function () {
				layout.requestRegion("region1");
			}, 3000);
		</script>
	</body>
</html>