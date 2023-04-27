<script lang="ts">
	import MovieList from '$lib/components/MovieList.svelte';
	import { page } from '$app/stores';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<MovieList
	title="Search results for {$page.url.searchParams.get('q')}"
	movies={data.movieResults.results}
/>
