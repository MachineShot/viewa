<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	interface Profile {
		avatar_url: string | null;
		full_name: string | null;
		id: string;
		updated_at: string | null;
		username: string | null;
		website: string | null;
	}

	interface WatchedItem {
		created_at: string | null;
		id: number;
		movie_id: number | null;
		profile_id: string;
		profiles: Profile | Profile[] | null;
	}

	interface GroupedWatched {
		profile_id: string;
		username: string | null;
		watched: WatchedItem[];
	}

	let groupedWatched: GroupedWatched[] | undefined = [];

	// Group the watched items by profile_id
	groupedWatched = data.watched?.reduce(
		(accumulator: GroupedWatched[], watchedItem: WatchedItem) => {
			const existingGroup = accumulator.find(
				(group) => group.profile_id === watchedItem.profile_id
			);
			if (existingGroup) {
				existingGroup.watched.push(watchedItem);
			} else {
				const username = Array.isArray(watchedItem.profiles)
					? watchedItem.profiles.map((profile) => profile.username).join(', ')
					: watchedItem.profiles?.username || null;
				accumulator.push({ profile_id: watchedItem.profile_id, username, watched: [watchedItem] });
			}
			return accumulator;
		},
		[]
	);
</script>

<pre>
	{JSON.stringify(data.watched, null, 2)}
	{JSON.stringify(data.toWatch, null, 2)}
</pre>

{#if groupedWatched}
	{#each groupedWatched as group}
		<div>
			<h3>Profile ID: {group.profile_id}</h3>
			<h4>Username: {group.username}</h4>
			<ul>
				{#each group.watched as watchedItem}
					<li>Watched ID: {watchedItem.id}</li>
				{/each}
			</ul>
		</div>
	{/each}
{/if}
