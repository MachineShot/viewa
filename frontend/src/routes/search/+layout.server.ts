import { SECRET_API_KEY } from '$env/static/private';

export const load = async ({ url }) => {
	const query = url.searchParams.get('q');

	const urlMovieSearch = await fetch(
		`https://api.themoviedb.org/3/search/movie?api_key=${SECRET_API_KEY}&query=${query}`
	);
	const urlPeopleSearch = await fetch(
		`https://api.themoviedb.org/3/search/person?api_key=${SECRET_API_KEY}&query=${query}`
	);
	const jsonMovieSearch = await urlMovieSearch.json();
	const jsonPeopleSearch = await urlPeopleSearch.json();

	return {
		movieResults: jsonMovieSearch,
		peopleResults: jsonPeopleSearch
	};
};
