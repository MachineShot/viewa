<textarea name="text" id="review_text" placeholder="Write your review!" />
<div class="stars">
	<input class="star star-5" id="star-5" type="radio" name="star" value="5" />
	<label class="star star-5" for="star-5" />
	<input class="star star-4" id="star-4" type="radio" name="star" value="4" />
	<label class="star star-4" for="star-4" />
	<input class="star star-3" id="star-3" type="radio" name="star" value="3" />
	<label class="star star-3" for="star-3" />
	<input class="star star-2" id="star-2" type="radio" name="star" value="2" />
	<label class="star star-2" for="star-2" />
	<input class="star star-1" id="star-1" type="radio" name="star" value="1" />
	<label class="star star-1" for="star-1" />
</div>
<button type="submit">Save Review</button>
<button type="reset">Reset</button>

<style>
	div.stars {
		width: 158px;
		display: inline-block;
	}
	input.star {
		display: none;
	}
	label.star {
		float: right;
		transition: all 0.2s;
	}
	input.star:checked ~ label.star:before {
		content: url('data:image/svg+xml,%3Csvg xmlns="http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg" width="24" height="24" viewBox="0 0 24 24"%3E%3Cpath fill="%231095c1" d="m12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72l3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41l-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18l-1.1 4.72c-.2.86.73 1.54 1.49 1.08l4.15-2.5z"%2F%3E%3C%2Fsvg%3E');
		transition: all 0.25s;
	}
	input.star-5:checked ~ label.star:before {
		text-shadow: 0 0 20px;
	}
	label.star:hover {
		transform: rotate(-15deg) scale(1.3);
	}
	label.star:before {
		content: url('data:image/svg+xml,%3Csvg xmlns="http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg" width="24" height="24" viewBox="0 0 24 24"%3E%3Cpath fill="%2324333e" d="m12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72l3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41l-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18l-1.1 4.72c-.2.86.73 1.54 1.49 1.08l4.15-2.5z"%2F%3E%3C%2Fsvg%3E');
	}

	textarea {
		resize: none;
	}
</style>
