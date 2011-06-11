<div class="entry" id="entry<?php echo $Id; ?>">
	<h1><?php echo $Title; ?></h1>
	<h3><?php echo $Subtitle; ?></h3>
	<div class="time">
		<?php echo strftime('%Y.%m.%d', $CreatedOn) ?>
	</div>
	<div class="retweet">retweet</div>
	<div class="preview" id="preview<?php echo $Id; ?>">
		<?php echo $Preview; ?>
	</div>
	<div class="content" id="content<?php echo $Id; ?>">
		<?php echo $Contents; ?>
	</div>
	<a href="#" class="backtolist">Posts list</a>
	<a href="#" class="backtotop">Back to top</a>
</div>