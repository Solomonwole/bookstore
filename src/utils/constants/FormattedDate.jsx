export const formatDateString = (dateString) => {
	const options = { day: "numeric", month: "long", year: "numeric" };
	const formattedDate = new Date(dateString).toLocaleDateString(
		"en-US",
		options
	);
	return formattedDate;
};
