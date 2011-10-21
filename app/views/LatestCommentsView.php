<?php foreach($comments as $comment): ?>
<div class="comment" id="comment<?php echo $comment['Id']; ?>">
	<div class="time">
		<?php echo strftime('%Y.%m.%d %H:%M %z', $comment['CreatedOn']) ?>
	</div>
	<div class="author"><?php echo $comment['Author']; ?></div>
	<div class="content"><?php echo $comment['Content']; ?></div>
</div>
<?php endforeach; ?>