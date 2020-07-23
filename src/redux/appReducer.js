import {getAuthUserData} from "./authReducer";

const SET_INITIALIZED = 'social-berrr/app/SET-INITIALIZED';

const initialState = {
	initialized: false
};

const appReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_INITIALIZED:
			return {
				...state,
				initialized: true
			};
		default:
			return state;
	}
};

export const initializedSuccess = () => (
	{
		type: SET_INITIALIZED
	}
);

export const initializeApp = () => (dispatch) => {
	let getAuthData = dispatch(getAuthUserData());

	Promise.all([getAuthData])
		.then(() => dispatch(initializedSuccess()));
};

export default appReducer;