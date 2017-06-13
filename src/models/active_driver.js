export default function (state = null, action) {
	switch(action.type) {
		case 'DRIVER_SELECTED':
			return action.payload;

		case 'SET_MY_LOCATION':
			return action.payload;
	}
	return state;
}
