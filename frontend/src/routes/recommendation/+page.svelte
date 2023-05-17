<script lang="ts">
	import { applyAction, enhance, type SubmitFunction } from '$app/forms';
	import Svelecte from 'svelecte';
	import type { ActionData } from './$types';
	import MovieCarousel from '$lib/components/MovieCarousel.svelte';

	let selection: any;
	export let form: ActionData;

	let loading = false;
	const handleSubmit: SubmitFunction = () => {
		loading = true;
		return async ({ result }) => {
			if (result.type === 'success') {
				await applyAction(result);
			}
			loading = false;
		};
	};
</script>

<svelte:head>
	<title>Viewa | Recommendations</title>
</svelte:head>

<main>
	<Svelecte
		multiple
		valueAsObject
		minQuery="3"
		max="3"
		placeholder="Start typing ('Toy Story' for example)"
		bind:value={selection}
		fetch="https://machineshot.eu.pythonanywhere.com/search=[query]"
	/>
	<form method="POST" action="?/recommend" use:enhance={handleSubmit}>
		<input type="hidden" name="selection" value={JSON.stringify(selection)} />
		<fieldset>
			<legend>Please select your preferred recommendation method:</legend>
			<div>
				<input type="radio" id="content" name="method" value="content" checked />
				<label data-tooltip="Recommendations based on movie content e.g. genre" for="content"
					>Content-Based</label
				>
				<input type="radio" id="collaborative" name="method" value="collaborative" />
				<label
					data-tooltip="Recommendations based on similarities between user ratings and movies"
					for="collaborative">Collaborative Filtering</label
				>
			</div>
		</fieldset>
		<button aria-busy={loading}>Get Recommendations</button>
	</form>
	{#if form?.results}
		<div class="list">
			<MovieCarousel title="Recommended Movies" content={form?.results} />
		</div>
	{/if}
</main>

<style>
	button {
		margin-top: 10px;
	}
	.list {
		margin: 1em 0 1em;
	}
	:global(.svelecte-control .sv-item-content) {
		overflow: unset !important;
	}

	:global(.svelecte-control) {
		--sv-min-height: 50px !important;
		--sv-bg: #1b2e3c !important;
		--sv-item-color: #67828c !important;
		--sv-highlight-bg: #52525e !important;
		--sv-border-color: #374956 !important;
		--sv-item-active-bg: #22303b !important;
		--sv-item-selected-bg: none !important;
		--sv-item-btn-bg-hover: none !important;
	}
</style>
