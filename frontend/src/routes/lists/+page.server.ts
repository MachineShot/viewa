import * as db from '$lib/supabaseClient';

export const load = async () => {
	const watched = db.lists.getAllWatched();
	const toWatch = db.lists.getAllToWatch();
	return {
		watched,
		toWatch
	};
};
