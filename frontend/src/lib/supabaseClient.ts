import { env } from '$env/dynamic/public';
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types/supabase';

export const supabaseClient = createClient<Database>(
	env.PUBLIC_SUPABASE_URL,
	env.PUBLIC_SUPABASE_ANON_KEY
);

export const auth = supabaseClient.auth;

export const reviews = {
	async getById(id: string) {
		const { data, error } = await supabaseClient
			.from('reviews')
			.select('*, profiles(*)')
			.eq('movie_id', id);
		//if (error) throw new Error(error.message);
		if (error) console.log(error.message);
		return data;
	},
	async insertReview(movie_id: number, profile_id: string, rating: number, text: string) {
		const { error } = await supabaseClient
			.from('reviews')
			.insert({ movie_id: movie_id, profile_id: profile_id, rating: rating, text: text });
		//if (error) throw new Error(error.message);
		if (error) console.log(error.message);
	},
	async removeReview(review_id: number) {
		const { error } = await supabaseClient.from('reviews').delete().eq('id', review_id);
		//if (error) throw new Error(error.message);
		if (error) console.log(error.message);
	}
};
