<script>
	import MovieCarousel from '$lib/components/MovieCarousel.svelte';
	import Icon from '@iconify/svelte';

	export let data;
</script>

<svelte:head>
	<title>Viewa</title>
</svelte:head>

<hgroup>
	<h1>Viewa</h1>
	<h3>For your next movie date, family night, party...</h3>
</hgroup>

<a href="/recommendation">
	<button>
		<Icon icon="material-symbols:recommend" />
		Get Recommendations
	</button>
</a>

<MovieCarousel title="Popular Movies" content={data.list_popular.results} />
<MovieCarousel title="Top Rated Movies" content={data.list_top.results} />
<MovieCarousel title="Now Playing" content={data.list_playing.results} />
<MovieCarousel title="Upcoming Movies" content={data.list_upcoming.results} />
