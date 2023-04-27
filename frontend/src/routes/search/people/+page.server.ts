export const load = async ({ parent }) => {
	const { peopleResults } = await parent();
	return { peopleResults };
};
