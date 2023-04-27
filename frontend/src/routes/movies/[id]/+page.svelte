<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import MovieDetails from '$lib/components/MovieDetails.svelte';
	import ReviewForm from '$lib/components/ReviewForm.svelte';
	import ReviewList from '$lib/components/ReviewList.svelte';

	export let data;
	let loggedIn = data.session != null;
	let loading = false;
</script>

<svelte:head>
	<title>Viewa | {data.movieDetails.title}</title>
</svelte:head>

<main>
	<MovieDetails
		bind:content={data.movieDetails}
		bind:videos={data.movieVideos.results}
		bind:providers={data.movieProviders.results}
		bind:cast={data.movieCast.cast}
	/>

	<section>
		<div class="grid">
			{#if loggedIn}
				<button>Add to Watched</button>
			{:else}
				<button data-tooltip="You have to be logged in">Add to Watched</button>
			{/if}
			<a href="/recommendation/{$page.params.id}-{data.movieDetails.title}"
				><button>More movies like this</button></a
			>
		</div>
	</section>
	<section>
		{#if loggedIn}
			<form method="post" action="?/insert" use:enhance>
				<ReviewForm />
			</form>
		{:else}
			<h3><a href="/account">Log In</a> to leave a review.</h3>
		{/if}
	</section>
	<section>
		{#if data.movieReviews?.length != 0}
			<ReviewList bind:reviews={data.movieReviews} userId={data.session?.user.id} />
		{:else}
			<h2>Be the first person to review this movie!</h2>
		{/if}
	</section>
</main>
