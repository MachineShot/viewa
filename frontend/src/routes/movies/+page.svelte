<script lang="ts">
	import MovieCarousel from '$lib/components/MovieCarousel.svelte';

	export let data;
</script>

<svelte:head>
	<title>Viewa | Movies</title>
</svelte:head>

<main>
	<section>
		<aside>
			<nav>
				<h4>Search by Genre</h4>
				<ul>
					{#each data.list_genres.genres as genre}
						<a href="movies/genres/{genre.id}-{genre.name}"><li>{genre.name}</li></a>
					{/each}
				</ul>
			</nav>
		</aside>
	</section>

	<MovieCarousel title="Popular Movies" content={data.list_popular.results} />
	<MovieCarousel title="Top Rated Movies" content={data.list_top.results} />
	<MovieCarousel title="Now Playing" content={data.list_playing.results} />
	<MovieCarousel title="Upcoming Movies" content={data.list_upcoming.results} />
</main>
