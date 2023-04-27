import { SECRET_API_KEY } from '$env/static/private';

export const load = async ({ fetch }) => {
	const urlPeoplePopular = await fetch(
		`https://api.themoviedb.org/3/person/popular?api_key=${SECRET_API_KEY}`
	);
	const jsonPeoplePopular = await urlPeoplePopular.json();
	return {
		list_popular: jsonPeoplePopular
	};
};
