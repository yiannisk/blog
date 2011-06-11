<?php foreach($entries as $entry): ?>
<div class="entry" id="entry<?php echo $entry['Id']; ?>">
	<h1><?php echo $entry['Title']; ?></h1>
	<h3><?php echo $entry['Subtitle']; ?></h3>
	<div class="time">
		<?php echo strftime('%Y.%m.%d', $entry['CreatedOn']) ?>
	</div>
	<div class="retweet">retweet</div>
	<div class="preview" id="preview<?php echo $entry['Id']; ?>">
		<?php echo $entry['Preview']; ?>
	</div>
	<a href="#" class="readmore" id="readmore<?php echo $entry['Id']; ?>">
		View Post</a>
</div>
<?php endforeach; ?>