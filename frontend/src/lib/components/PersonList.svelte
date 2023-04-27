<script lang="ts">
	export let people: any = [];
	export let title: string;
</script>

<h2>{title}</h2>
{#each people as person}
	<article class="wrapper">
		<div class="image">
			{#if person.profile_path}
				<a href="/people/{person.id}">
					<img src="https://image.tmdb.org/t/p/w300{person.profile_path}" alt={person.name} />
				</a>
			{:else}
				<img
					src="https://ui-avatars.com/api/?name={person.name}&size={94}&background=11191f&color=d5dce2"
					alt={person.name}
				/>
			{/if}
		</div>
		<div class="details">
			<div class="wrapper">
				<div class="title">
					<div>
						<a href="/people/{person.id}">
							<h2>{person.name}</h2>
						</a>
					</div>
					<p>
						<span>{person.known_for_department}</span>
						{#each person.known_for as movie, i}
							{#if movie.media_type == 'movie'}
								<a href="/movies/{movie.id}">{movie.title}</a>
							{/if}
						{/each}
					</p>
				</div>
			</div>
		</div>
	</article>
{/each}

<style>
	h2 {
		margin: 0%;
	}

	div.image {
		min-width: 94px;
		width: 94px;
		height: 141px;
	}

	div.details div.overview p {
		font-size: 1em;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		text-overflow: ellipsis;
		overflow: hidden;
		margin: 0;
	}

	div.details {
		width: 100%;
		padding-left: 15px;
		box-sizing: border-box;
		display: flex;
		flex-wrap: wrap;
		align-content: center;
		align-items: center;
	}

	img {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}

	.wrapper {
		display: flex;
	}

	p {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		padding: 0;
		width: 100%;
		margin: 0;
	}

	p a {
		margin-right: 10px;
	}
</style>
