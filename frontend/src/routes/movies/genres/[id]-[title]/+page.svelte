<script lang="ts">
	import MovieList from '$lib/components/MovieList.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let page = 1;
	const limit = 10;

	async function loadMore() {
		const newMovies = await getPosts({ page: page + 1, limit: limit });
		data.movies.results = [...data.movies.results, ...newMovies];
		page++;
	}
</script>

<svelte:head>
	<title>Viewa | {data.title} Movies</title>
</svelte:head>

<main>
	<MovieList movies={data.movies.results} title="{data.title} Movies" />
</main>

<style>
</style>
