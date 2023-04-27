<script lang="ts">
	import { page } from '$app/stores';
	import PersonList from '$lib/components/PersonList.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<PersonList
	title="Search results for {$page.url.searchParams.get('q')}"
	people={data.peopleResults.results}
/>
