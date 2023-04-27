import { SECRET_API_KEY } from '$env/static/private';

export const load = async ({ fetch }) => {
	const urlMoviesPopular = await fetch(
		`https://api.themoviedb.org/3/movie/popular?api_key=${SECRET_API_KEY}`
	);
	const urlMoviesPlaying = await fetch(
		`https://api.themoviedb.org/3/movie/now_playing?api_key=${SECRET_API_KEY}`
	);
	const urlMoviesTop = await fetch(
		`https://api.themoviedb.org/3/movie/top_rated?api_key=${SECRET_API_KEY}`
	);
	const urlMoviesUpcoming = await fetch(
		`https://api.themoviedb.org/3/movie/upcoming?api_key=${SECRET_API_KEY}`
	);
	const urlMovieGenres = await fetch(
		`https://api.themoviedb.org/3/genre/movie/list?api_key=${SECRET_API_KEY}`
	);
	const jsonMovieGenres = await urlMovieGenres.json();
	const jsonMoviesPopular = await urlMoviesPopular.json();
	const jsonMoviesPlaying = await urlMoviesPlaying.json();
	const jsonMoviesTop = await urlMoviesTop.json();
	const jsonMoviesUpcoming = await urlMoviesUpcoming.json();
	return {
		list_popular: jsonMoviesPopular,
		list_playing: jsonMoviesPlaying,
		list_top: jsonMoviesTop,
		list_upcoming: jsonMoviesUpcoming,
		list_genres: jsonMovieGenres
	};
};
