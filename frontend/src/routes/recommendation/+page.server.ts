import { SECRET_API_KEY } from '$env/static/private';

/* eslint-disable @typescript-eslint/no-explicit-any */
export const load = async () => {
	return;
};

export const actions = {
	recommend: async ({ fetch, request }) => {
		const formData = await request.formData();
		const selection = JSON.parse(String(formData.get('selection')));
		const method = String(formData.get('method'));
		if (selection != null) {
			const movieTitles = selection.map((movie: any) => movie.title);

			const result = {
				titles: movieTitles
			};

			// Send a POST request with the JSON data
			const postSelection = await fetch(`https://machineshot.eu.pythonanywhere.com/${method}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(result)
			});

			// Get the response data as JSON
			const recommendations = await postSelection.json();
			console.log(recommendations);
			const urls: string[] = [];

			recommendations.forEach((rec: any) => {
				const url = `https://api.themoviedb.org/3/movie/${rec.tmdbId}?api_key=${SECRET_API_KEY}`;
				urls.push(url);
			});

			const promises = urls.map((url) => fetch(url).then((response) => response.json()));
			const results = await Promise.all(promises);
			return {
				results
			};
		}
	}
};
