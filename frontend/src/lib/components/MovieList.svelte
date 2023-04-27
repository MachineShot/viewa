<script lang="ts">
	import no_data from '$lib/assets/no_data.svg';
	export let movies: any = [];
	export let title: string;
	const options = { month: 'long', day: 'numeric', year: 'numeric' } as const;
</script>

<h2>{title}</h2>
{#each movies as movie}
	<article class="wrapper">
		<div class="image">
			{#if movie.poster_path}
				<a href="/movies/{movie.id}">
					<img src="https://image.tmdb.org/t/p/w300{movie.poster_path}" alt={movie.title} />
				</a>
			{:else}
				<a href="/movies/{movie.id}"> <img src={no_data} alt={movie.title} /></a>
			{/if}
		</div>
		<div class="details">
			<div class="wrapper">
				<div class="title">
					<div>
						<a href="/movies/{movie.id}">
							<h2>{movie.title}</h2>
						</a>
					</div>
					{#if movie.release_date}
						<span class="release_date"
							>{new Date(movie.release_date).toLocaleDateString('en-US', options)}</span
						>
					{/if}
				</div>
			</div>
			<div class="overview">
				<p>{movie.overview}</p>
			</div>
		</div>
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
		overflow: hidden;
		margin: 0;
	}

	div.details {
		width: 100%;
		padding-left: 15px;
		box-sizing: border-box;
		display: flex;
		flex-wrap: wrap;
		align-content: center;
		align-items: center;
	}

	img {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}

	.wrapper {
		display: flex;
		width: 100%;
	}

	.overview {
		margin-top: 20px;
	}
</style>
