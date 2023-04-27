<script lang="ts">
	import { page } from '$app/stores';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<aside>
	<ul>
		<li>
			<a href="/search/movies?q={$page.url.searchParams.get('q')}">
				<button>Movies {data.movieResults.total_results}</button>
			</a>
		</li>
		<li>
			<a href="/search/people?q={$page.url.searchParams.get('q')}">
				<button>People {data.peopleResults.total_results}</button>
			</a>
		</li>
	</ul>
</aside>

<main>
	<slot />
</main>
