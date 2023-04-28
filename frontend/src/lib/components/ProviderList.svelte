<script lang="ts">
	export let providers: any[];
	export let link: string;
</script>

<div class="providers">
	<ul>
		{#each providers as provider}
			<li>
				<div>
					<a target="_blank" href={link}>
						<img
							class="provider"
							src="https://image.tmdb.org/t/p/original{provider.logo_path}"
							alt={provider.provider_name}
							width="50"
							height="50"
						/>
					</a>
				</div>
			</li>
		{/each}
	</ul>
</div>

<style>
	.providers ul {
		margin: 0;
		padding: 0;
		list-style-type: none;
	}

	.providers ul li {
		display: inline-block;
	}
	.providers ul li a {
		text-decoration: none;
		display: block;
		margin-right: 15px;
	}
</style>
