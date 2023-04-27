import { SECRET_API_KEY } from '$env/static/private';

export const load = async ({ fetch, params }) => {
	const urlGenreMovies = await fetch(
		`https://api.themoviedb.org/3/discover/movie?api_key=${SECRET_API_KEY}&with_genres=${params.id}`
	);
	const jsonGenreMovies = await urlGenreMovies.json();

	return {
		movies: jsonGenreMovies,
		title: params.title
	};
};
