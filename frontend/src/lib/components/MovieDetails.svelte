<script lang="ts">
	import { toHoursAndMinutes } from '$lib/helpers/format';
	import type { ICast, ICountries, IDetails, IVideo } from '$lib/types/movie';
	import StarRating from 'svelte-star-rating';
	import CustomModal from './CustomModal.svelte';
	import ProviderList from './ProviderList.svelte';
	import CastCarousel from './CastCarousel.svelte';
	import no_data from '$lib/assets/no_data.svg';
	import Icon from '@iconify/svelte';

	export let content: IDetails;
	export let videos: IVideo[];
	export let providers: ICountries;
	export let cast: ICast[];

	const options = { month: 'long', day: 'numeric', year: 'numeric' } as const;
	const config = {
		emptyColor: '#24333e',
		fullColor: '#1095c1',
		showText: true,
		size: 21.25
	};

	let showModal: boolean = false;
	let keyEmbed: string = '';
	let videoTitle: string = '';
	function showTrailer() {
		showModal = true;
		let idx = videos.length - 1;
		keyEmbed = videos[idx].site.toLowerCase() === 'youtube' ? videos[idx].key : '';
		videoTitle = videos[idx].name;
	}
</script>

<section>
	<div
		class="bg"
		style="background-image:
			linear-gradient(22deg, rgba(17,25,31,1) 32%, rgba(17,25,31,0.3043418050814075) 100%),
			url('https://image.tmdb.org/t/p/w1280{content.backdrop_path}');"
	>
		{#if content.poster_path}
			<img src="https://image.tmdb.org/t/p/w300{content.poster_path}" alt={content.title} />
		{:else}
			<img src={no_data} alt={content.title} />
		{/if}
		<div class="info">
			<h1>{content.title}</h1>
			<StarRating rating={content.vote_average * 0.5} {config} />
			<h3>{new Date(content.release_date).toLocaleDateString('en-US', options)}</h3>
			<h3>{toHoursAndMinutes(content.runtime)}</h3>
			<div class="genres">
				{#each content.genres as genre}
					<a href="/movies/genres/{genre.id}-{genre.name}"><span>{genre.name}</span></a>
				{/each}
			</div>
			{#if content.imdb_id}
				<a href="https://www.imdb.com/title/{content.imdb_id}" target="_blank">
					<Icon icon="fa:imdb" />
				</a>
			{/if}
			<p>
				{content.overview}
			</p>
		</div>
	</div>
</section>

{#if providers.LT != null}
	<section>
		<article>
			<h1>Where to watch?</h1>
			{#if providers.LT.flatrate != null}
				<h3>Stream now on:</h3>
				<ProviderList providers={providers.LT.flatrate} link={providers.LT.link} />
			{/if}
			{#if providers.LT.rent != null}
				<h3>Rent now on:</h3>
				<ProviderList providers={providers.LT.rent} link={providers.LT.link} />
			{/if}
			{#if providers.LT.buy != null}
				<h3>Buy now on:</h3>
				<ProviderList providers={providers.LT.buy} link={providers.LT.link} />
			{/if}
			<p>
				Streaming providers provided by
				<a target="_blank" href="https://www.justwatch.com/">JustWatch</a>
			</p>
		</article>
	</section>
{/if}

<section>
	<CastCarousel content={cast} title="Movie Cast" />
</section>

{#if videos.length}
	<button on:click={showTrailer}>
		<div>Watch Trailer</div>
	</button>
{/if}

{#if showModal}
	<CustomModal bind:showModal>
		<iframe
			title={videoTitle}
			class="video"
			frameborder="0"
			allow="accelerometer; autoplay; encrypted-media; gyroscope;"
			allowfullscreen
			src="https://www.youtube.com/embed/{keyEmbed}"
		/>
	</CustomModal>
{/if}

<style>
	.video {
		aspect-ratio: 16 / 9;
		width: 100%;
	}
	h1,
	h3 {
		margin: 0%;
	}
	a {
		text-decoration: none;
	}
	.bg img {
		min-height: 180px;
		height: 250px;
		margin-top: 20px;
		margin-left: 20px;
	}
	.bg {
		border-radius: 0.25rem;
	}
	.info {
		margin-top: 20px;
		margin-left: 20px;
	}
	.genres span {
		margin-right: 1em;
	}
</style>
