<script lang="ts">
	import type { ICast } from '$lib/types/movie';

	export let title: string;
	export let content: ICast | any = [];
</script>

<article>
	<h4>{title}</h4>
	<div class="container">
		{#each content as person}
			<div class="card">
				<div class="image">
					<div class="wrapper">
						<a href="/people/{person.id}">
							{#if person.profile_path}
								<img src="https://image.tmdb.org/t/p/w300{person.profile_path}" alt={person.name} />
							{:else}
								<img
									src="https://ui-avatars.com/api/?name={person.name}&size=122&background=11191f&color=d5dce2"
									alt={person.name}
								/>
							{/if}
						</a>
					</div>
				</div>
				<div class="content">
					<a href="/people/{person.id}">
						<h5>{person.name}</h5>
						{#if person.character}
							<h5>{person.character}</h5>
						{/if}
					</a>
				</div>
			</div>
		{/each}
	</div>
</article>

<style>
	h5 {
		font-size: medium;
		margin-bottom: 1em;
	}

	div.image {
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
		border-radius: var(--imageBorderRadius);
		width: 100%;
		min-height: 180px;
		height: 180px;
		overflow: hidden;
		margin-bottom: 1em;
	}

	.card {
		display: inline-block;
		color: white;
		text-align: center;
		padding: 14px;
		text-decoration: none;
		width: 150px;
		min-width: 150px;
		background: transparent;
		border: none;
		box-shadow: none;
		margin-top: 0;
		overflow: visible;
	}

	.container {
		display: flex;
		width: 100%;
		overflow-x: auto;
		transition: height 0.5s linear;
	}

	.card:hover {
		background-color: #11191f;
	}
</style>
