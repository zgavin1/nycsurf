export const beaches = {
	rockaway: {
		name: 'Rockaway Beach',
		beachId: '384'
	},
	long: {
		name: 'Long Beach',
		beachId: '383'
	}
}

export const evaluateRating = (sr, fr) => {
	let output;

	switch (sr) {
		case 0:
		case 1:
			output = 'Hard pass.'
			break;
		case 2:
			output = 'Maybe next time.'
			break;
		case 3:
			output = 'Good to go.'
			break;
		case 4:
		case 5:
			output = 'Awesome.'
			break;
		default:
			break;
	}

	if (sr < 2) {
		return output;
	}
	
	switch (fr) {
		case 0:
		case 1:
			output += ' Glassy.'
			break;
		case 2:
			output += ' Some wind.'
			break;
		case 3:
			output += ' Tough winds.'
			break;
		case 4:
		case 5:
			output += ' Too damn windy.'
			break;
		default:
			break;
	}

	return output;
};