<script lang="ts">
	import type { IList } from '$lib/types/movie';
	import StarRating from 'svelte-star-rating';
	import no_data from '$lib/assets/no_data.svg';

	export let title: string;
	export let content: IList | any = [];

	const config = {
		emptyColor: '#24333e',
		fullColor: '#1095c1',
		showText: true,
		size: 21.25
	};
</script>

<article>
	<h4>{title}</h4>
	<div class="container">
		{#each content as movie}
			<div class="card">
				<div class="image">
					<div class="wrapper">
						{#if movie.poster_path}
							<a href="/movies/{movie.id}">
								<img src="https://image.tmdb.org/t/p/w300{movie.poster_path}" alt={movie.title} />
							</a>
						{:else}
							<a href="/movies/{movie.id}">
								<img src={no_data} alt={movie.title} />
							</a>
						{/if}
					</div>
				</div>
				<div class="content">
					<a href="/movies/{movie.id}">
						<h5>{movie.title}</h5>
					</a>
					<div class="rating">
						<div class="stars">
							<StarRating rating={movie.vote_average * 0.5} {config} />
						</div>
					</div>
				</div>
			</div>
		{/each}
	</div>
</article>

<style>
	h5 {
		font-size: medium;
		margin-bottom: 1em;
	}

	div.image {
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
		border-radius: var(--imageBorderRadius);
		width: 100%;
		min-height: 180px;
		height: 180px;
		overflow: hidden;
		margin-bottom: 1em;
	}

	.card {
		display: inline-block;
		color: white;
		text-align: center;
		padding: 14px;
		text-decoration: none;
		width: 150px;
		min-width: 150px;
		background: transparent;
		border: none;
		box-shadow: none;
		margin-top: 0;
		overflow: visible;
	}

	.container {
		display: flex;
		width: 100%;
		overflow-x: auto;
		transition: height 0.5s linear;
	}

	.card:hover {
		background-color: #11191f;
	}
</style>
