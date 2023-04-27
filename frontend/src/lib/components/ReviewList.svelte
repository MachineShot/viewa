<script lang="ts">
	import StarRating from 'svelte-star-rating';
	import Avatar from './Avatar.svelte';
	import { enhance } from '$app/forms';

	export let reviews: any = [];
	export let userId: string | undefined;
	const options = { month: 'long', day: 'numeric', year: 'numeric' } as const;

	const config = {
		emptyColor: '#24333e',
		fullColor: '#1095c1'
	};
</script>

{#each reviews as review}
	<article class="wrapper">
		<div class="image">
			<Avatar bind:url={review.profiles.avatar_url} size={5} />
		</div>
		<div class="details">
			<div class="wrapper">
				<div class="title">
					<h2>{review.profiles.username || 'Anonymous'}</h2>
					<span class="date"
						>{new Date(review.created_at).toLocaleDateString('en-US', options)}</span
					>
				</div>
			</div>
			<div class="overview">
				<div>
					<StarRating rating={review.rating} {config} />
				</div>
				<p>{review.text}</p>
			</div>
		</div>
		{#if userId == review.profile_id}
			<form action="?/remove" method="post" use:enhance>
				<input type="hidden" name="id" value={review.id} />
				<button class="outline" type="submit">❌</button>
			</form>
		{/if}
	</article>
{/each}

<style>
	h2 {
		margin: 0%;
	}

	div.image {
		min-width: 94px;
		width: 94px;
		height: 141px;
	}

	div.details div.overview p {
		font-size: 1em;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		text-overflow: ellipsis;
		margin: 0;
	}

	div.details {
		width: 100%;
		padding-left: 15px;
		box-sizing: border-box;
	}
	div.title {
		width: 100%;
	}

	.wrapper {
		display: flex;
	}
</style>
