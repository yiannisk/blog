<?php foreach($entries as $entry): ?>
<div class="searchItem">
	<div class="searchItemTitle"><?php echo $entry['Title'] ?></div>
	<?php echo $entry['Subtitle']; ?>
</div>
<br />
<?php endforeach; ?>