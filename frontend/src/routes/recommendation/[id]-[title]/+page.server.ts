import { SECRET_API_KEY } from '$env/static/private';

export const load = async ({ fetch, params }) => {
	const urlRecMovies = await fetch(
		`https://api.themoviedb.org/3/movie/${params.id}/recommendations?api_key=${SECRET_API_KEY}`
	);
	const jsonRecMovies = await urlRecMovies.json();

	return {
		movies: jsonRecMovies,
		title: params.title
	};
};
