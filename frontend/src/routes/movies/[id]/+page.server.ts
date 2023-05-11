/* eslint-disable @typescript-eslint/no-explicit-any */
import { SECRET_API_KEY } from '$env/static/private';
import * as db from '$lib/supabaseClient';
import { fail } from '@sveltejs/kit';

let toWatch: any | null;
let watched: any | null;

export const load = async ({ fetch, params, locals: { getSession } }) => {
	const session = await getSession();

	if (session) {
		toWatch = await db.lists.getToWatchByProfile(params.id, session.user.id);
		watched = await db.lists.getWatchedByProfile(params.id, session.user.id);
	}

	const urlMovieDetails = await fetch(
		`https://api.themoviedb.org/3/movie/${params.id}?api_key=${SECRET_API_KEY}`
	);
	const urlMovieVideos = await fetch(
		`https://api.themoviedb.org/3/movie/${params.id}/videos?api_key=${SECRET_API_KEY}`
	);
	const urlMovieProviders = await fetch(
		`https://api.themoviedb.org/3/movie/${params.id}/watch/providers?api_key=${SECRET_API_KEY}`
	);
	const urlMovieCast = await fetch(
		`https://api.themoviedb.org/3/movie/${params.id}/credits?api_key=${SECRET_API_KEY}`
	);
	const jsonMovieDetails = await urlMovieDetails.json();
	const jsonMovieVideos = await urlMovieVideos.json();
	const jsonMovieProviders = await urlMovieProviders.json();
	const jsonMovieCast = await urlMovieCast.json();

	const movieReviews = await db.reviews.getReviewById(params.id);

	return {
		movieDetails: jsonMovieDetails,
		movieVideos: jsonMovieVideos,
		movieProviders: jsonMovieProviders,
		movieReviews,
		movieCast: jsonMovieCast,
		watched,
		toWatch
	};
};

export const actions = {
	insert: async ({ params, request, locals: { getSession } }) => {
		const formData = await request.formData();
		const rating = Number(formData.get('star'));

		if (!rating) {
			return fail(400, { rating, missing: true });
		}

		const reviewText = String(formData.get('text'));
		const session = await getSession();
		db.reviews.insertReview(Number(params.id), session?.user.id, rating, reviewText);

		return { success: true };
	},
	remove: async ({ request }) => {
		const formData = await request.formData();
		const reviewId = Number(formData.get('id'));

		db.reviews.removeReview(reviewId);

		return { success: true };
	},
	addWatched: async ({ params, locals: { getSession } }) => {
		const session = await getSession();
		db.lists.insertWatched(Number(params.id), session?.user.id);

		return { success: true };
	},
	removeWatched: async () => {
		db.lists.removeWatched(watched[0].id);

		return { success: true };
	},
	addToWatch: async ({ params, locals: { getSession } }) => {
		const session = await getSession();
		db.lists.insertToWatch(Number(params.id), session?.user.id);

		return { success: true };
	},
	removeToWatch: async () => {
		db.lists.removeToWatch(toWatch[0].id);

		return { success: true };
	}
};
