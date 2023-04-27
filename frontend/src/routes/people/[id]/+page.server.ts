import { SECRET_API_KEY } from '$env/static/private';

export const load = async ({ fetch, params }) => {
	const urlPersonDetails = await fetch(
		`https://api.themoviedb.org/3/person/${params.id}?api_key=${SECRET_API_KEY}&append_to_response=movie_credits,images,external_ids`
	);
	const jsonPersonDetails = await urlPersonDetails.json();

	return {
		details: jsonPersonDetails
	};
};
