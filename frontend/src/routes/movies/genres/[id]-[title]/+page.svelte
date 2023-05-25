<script lang="ts">
	import MovieList from '$lib/components/MovieList.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>Viewa | {data.title} Movies</title>
</svelte:head>

<main>
	<MovieList movies={data.movies.results} title="{data.title} Movies" />
</main>

<style>
</style>
