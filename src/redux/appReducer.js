import {getAuthUserData} from "./authReducer";

const SET_INITIALIZED = 'social-berrr/app/SET-INITIALIZED';
const SET_GLOBAL_ERROR = 'social-berrr/app/SET-GLOBAL-ERROR';

const initialState = {
	initialized: false,
	globalError: null
};

const appReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_INITIALIZED:
			return {
				...state,
				initialized: true
			};
		case SET_GLOBAL_ERROR:
			return {
				...state,
				...action.payload
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

export const setGlobalError = (payload) => (
	{
		type: SET_GLOBAL_ERROR,
		payload
	}
);

export const initializeApp = () => (dispatch) => {
	let getAuthData = dispatch(getAuthUserData());

	Promise.all([getAuthData])
		.then(() => dispatch(initializedSuccess()));
};

export const initializeError = (errorReason) => (dispatch) => {
	dispatch(setGlobalError({globalError: errorReason}));
	setTimeout(() => {
		dispatch(setGlobalError({globalError: null}));
	}, 12000);
};

export default appReducer;