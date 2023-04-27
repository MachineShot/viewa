<script lang="ts">
	import { supabaseClient } from '$lib/supabaseClient';

	export let size = 10;
	export let url: string | null = null;

	let avatarUrl: string | null = null;

	const downloadImage = async (path: string) => {
		try {
			const { data, error } = await supabaseClient.storage.from('avatars').download(path);

			if (error) {
				throw error;
			}

			const url = URL.createObjectURL(data);
			avatarUrl = url;
		} catch (error) {
			if (error instanceof Error) {
				console.log('Error downloading image: ', error.message);
			}
		}
	};

	$: if (url) downloadImage(url);
</script>

<div>
	{#if avatarUrl}
		<img src={avatarUrl} alt="Avatar" style="height: {size}em; width: {size}em;" />
	{:else}
		<img
			src="https://ui-avatars.com/api/?name=A&size={size * 16}&background=11191f&color=d5dce2"
			alt="Avatar"
			style="height: {size}em; width: {size}em;"
		/>
	{/if}
	<input type="hidden" name="avatarUrl" value={url} />
</div>
