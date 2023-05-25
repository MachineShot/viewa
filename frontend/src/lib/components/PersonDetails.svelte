<script lang="ts">
	import Icon from '@iconify/svelte';
	import MovieCarousel from './MovieCarousel.svelte';
	import type { IPersonDetails } from '$lib/types/movie';

	export let details: IPersonDetails;
</script>

<main>
	<h1>{details.name}</h1>
	<section>
		<div class="image">
			{#if details.profile_path}
				<img src="https://image.tmdb.org/t/p/w300{details.profile_path}" alt={details.name} />
			{:else}
				<img
					src="https://ui-avatars.com/api/?name={details.name}&size=122&background=11191f&color=d5dce2"
					alt={details.name}
				/>
			{/if}
		</div>
		<article>
			<div>
				<h2>Biography</h2>
				<p>{details.biography}</p>
			</div>
			<div class="links">
				{#if details.external_ids.imdb_id}
					<a href="https://www.imdb.com/name/{details.external_ids.imdb_id}" target="_blank">
						<Icon icon="fa:imdb" />
					</a>
				{/if}
				{#if details.external_ids.youtube_id}
					<a href="https://www.youtube.com/{details.external_ids.youtube_id}" target="_blank">
						<Icon icon="fa:youtube-play" />
					</a>
				{/if}
				{#if details.external_ids.facebook_id}
					<a href="https://www.facebook.com/{details.external_ids.facebook_id}" target="_blank">
						<Icon icon="fa:facebook-square" />
					</a>
				{/if}
				{#if details.external_ids.instagram_id}
					<a href="https://www.instagram.com/{details.external_ids.instagram_id}" target="_blank">
						<Icon icon="fa:instagram" />
					</a>
				{/if}
				{#if details.external_ids.twitter_id}
					<a href="https://www.twitter.com/{details.external_ids.twitter_id}" target="_blank">
						<Icon icon="fa:twitter-square" />
					</a>
				{/if}
				{#if details.external_ids.tiktok_id}
					<a href="https://www.tiktok.com/@{details.external_ids.tiktok_id}" target="_blank">
						<Icon icon="fa6-brands:tiktok" />
					</a>
				{/if}
				{#if details.homepage}
					<a href={details.homepage} target="_blank">
						<Icon icon="fa:home" />
					</a>
				{/if}
			</div>
		</article>
	</section>
	<MovieCarousel title="Acted in" content={details.movie_credits.cast} />
</main>

<style>
	h2 {
		margin: 0;
		font-size: large;
	}
	section {
		display: flex;
	}
	article {
		margin-top: 0%;
	}
	.image {
		padding-right: 10px;
		min-width: 300px;
	}
	.links :global(svg) {
		font-size: 28px;
		line-height: 1em;
	}
</style>
