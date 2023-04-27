<script lang="ts">
	import PersonDetails from '$lib/components/PersonDetails.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>Viewa | {data.details.name}</title>
</svelte:head>

<PersonDetails details={data.details} />
