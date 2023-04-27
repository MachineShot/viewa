<script lang="ts">
	import MovieList from '$lib/components/MovieList.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>Viewa | Recommended movies for {data.title}</title>
</svelte:head>

<main>
	<MovieList movies={data.movies.results} title="Recommended movies for {data.title}" />
</main>
