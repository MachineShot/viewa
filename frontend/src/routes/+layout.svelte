<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import Icon from '@iconify/svelte';
	import Footer from '$lib/components/Footer.svelte';
	import logo from '$lib/assets/logo.svg';
	import logo_mobile from '$lib/assets/logo_mobile.svg';

	export let data;
	let searchText = '';

	$: ({ supabase } = data);

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange(() => {
			invalidate('supabase:auth');
		});

		return () => subscription.unsubscribe();
	});
</script>

<nav class="container-fluid desktop">
	<ul>
		<li>
			<div class="logo">
				<a href="/" class="contrast">
					<img src={logo} alt="Viewa logo" />
				</a>
			</div>
		</li>
	</ul>
	<ul>
		<li>
			<form action="/search/movies">
				<label for="search">
					<input
						type="search"
						id="search"
						name="q"
						placeholder="Search"
						minlength="3"
						required
						bind:value={searchText}
					/>
				</label>
			</form>
		</li>
		<li>
			<a href="/movies">
				<Icon icon="mdi:movie-open" />
				<span>Movies</span>
			</a>
		</li>
		<li>
			<a href="/recommendation">
				<Icon icon="material-symbols:recommend" />
				<span>Recommendations</span>
			</a>
		</li>
		<li>
			<a href="/people">
				<Icon icon="material-symbols:recent-actors" />
				<span>People</span>
			</a>
		</li>
		<li>
			<a href="/account"
				><Icon icon="material-symbols:person" />
				<span>{data.session ? data.session.user.email : 'Login'}</span>
			</a>
		</li>
	</ul>
</nav>

<nav class="container-fluid mobile">
	<ul>
		<li>
			<div class="logo-mobile">
				<a href="/" class="contrast">
					<img src={logo_mobile} alt="Viewa logo" />
				</a>
			</div>
		</li>
	</ul>
	<ul>
		<li>
			<form action="/search/movies">
				<label for="search">
					<input
						type="search"
						id="search"
						name="q"
						placeholder="Search"
						minlength="3"
						required
						bind:value={searchText}
					/>
				</label>
			</form>
		</li>
		<li>
			<a data-tooltip="Movies" data-placement="bottom" href="/movies">
				<Icon icon="mdi:movie-open" />
			</a>
		</li>
		<li>
			<a data-tooltip="Recommendations" data-placement="bottom" href="/recommendation">
				<Icon icon="material-symbols:recommend" />
			</a>
		</li>
		<li>
			<a data-tooltip="People" data-placement="bottom" href="/people">
				<Icon icon="material-symbols:recent-actors" />
			</a>
		</li>
		<li>
			<a data-tooltip="Account" data-placement="bottom" href="/account">
				<Icon icon="material-symbols:person" />
			</a>
		</li>
	</ul>
</nav>

<div class="container">
	<slot />

	<Footer />
</div>

<style>
	a:hover {
		background-color: #18232c;
	}
	nav {
		-webkit-backdrop-filter: saturate(180%) blur(20px);
		z-index: 99;
		position: fixed;
		top: 0;
		backdrop-filter: saturate(180%) blur(20px);
		background-color: var(--nav-background-color);
		box-shadow: 0 1px 0 var(--nav-border-color);
	}

	.container {
		padding-top: calc(var(--block-spacing-vertical) + 5.5rem);
	}

	form {
		margin-bottom: 0%;
	}

	.logo {
		min-width: 180px;
		width: 300px;
	}

	.mobile {
		visibility: hidden;
	}

	@media only screen and (max-width: 768px) {
		.desktop {
			visibility: hidden;
		}
		.mobile {
			visibility: visible;
		}

		.logo-mobile {
			width: 50px;
		}
	}
</style>
