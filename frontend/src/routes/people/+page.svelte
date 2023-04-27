<script lang="ts">
	import CastCarousel from '$lib/components/CastCarousel.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>Viewa | People</title>
</svelte:head>

<CastCarousel content={data.list_popular.results} title="Popular People" />
