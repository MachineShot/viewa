<script lang="ts">
	import { supabaseClient } from '$lib/supabaseClient';
	import { createEventDispatcher } from 'svelte';

	export let size = 10;
	export let url: string | null = null;

	let avatarUrl: string | null = null;
	let uploading = false;
	let files: FileList;

	const dispatch = createEventDispatcher();

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

	const uploadAvatar = async () => {
		try {
			uploading = true;

			if (!files || files.length === 0) {
				throw new Error('You must select an image to upload.');
			}

			const file = files[0];
			const fileExt = file.name.split('.').pop();
			url = `${Math.random()}.${fileExt}`;

			let { error } = await supabaseClient.storage.from('avatars').upload(url, file);

			if (error) {
				throw error;
			}

			dispatch('upload');
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			}
		} finally {
			uploading = false;
		}
	};

	$: if (url) downloadImage(url);
</script>

<div>
	{#if avatarUrl}
		<img
			src={avatarUrl}
			alt={avatarUrl ? 'Avatar' : 'No image'}
			class="avatar image"
			style="height: {size}em; width: {size}em;"
		/>
	{:else}
		<div class="avatar no-image" style="height: {size}em; width: {size}em;" />
	{/if}
	<input type="hidden" name="avatarUrl" value={url} />

	<div style="width: {size}em;">
		<label class="button primary block" for="single">
			{uploading ? 'Uploading ...' : 'Upload'}
		</label>
		<input
			style="visibility: hidden; position:absolute;"
			type="file"
			id="single"
			accept="image/*"
			bind:files
			on:change={uploadAvatar}
			aria-busy={uploading}
		/>
	</div>
</div>

<style>
	label {
		display: block;
		margin: 5px 0;
		color: var(--custom-color-secondary);
		font-size: 0.8rem;
		text-transform: uppercase;
	}
	input {
		width: 100%;
		border-radius: 5px;
		border: var(--custom-border);
		padding: 8px;
		font-size: 0.9rem;
		background-color: var(--custom-bg-color);
		color: var(--custom-color);
	}
	.block {
		display: block;
		width: 100%;
	}
	.button {
		color: var(--custom-color);
		border: var(--custom-border);
		background-color: var(--custom-bg-color);
		display: inline-block;
		text-align: center;
		border-radius: var(--custom-border-radius);
		padding: 0.5rem 1rem;
		cursor: pointer;
		text-align: center;
		font-size: 0.9rem;
		text-transform: uppercase;
	}
	.avatar {
		border-radius: var(--custom-border-radius);
		overflow: hidden;
		max-width: 100%;
	}
	.avatar.image {
		object-fit: cover;
	}
	.avatar.no-image {
		background-color: #333;
		border: 1px solid rgb(200, 200, 200);
		border-radius: 5px;
	}
</style>
