export const load = async ({ parent }) => {
	const { movieResults } = await parent();
	return { movieResults };
};
