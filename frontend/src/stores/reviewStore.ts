import { writable } from 'svelte/store';
import type { SupabaseClient } from '@supabase/supabase-js';

export const reviews = writable([]);
export let supabase: SupabaseClient;

export const loadReview = async (movie_id: string) => {
	try {
		const { data, error } = await supabase.from('reviews').select().eq('movie_id', movie_id);
		if (error) {
			throw error;
		}
	} catch (error) {
		if (error instanceof Error) {
			console.log('Error getting reviews: ', error.message);
		}
	}
};
