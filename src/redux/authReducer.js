import {authAPI, securityApi} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'social-berrr/auth/SET-USER-DATA';
const GET_CAPTCHA_URL_SUCCESS = 'social-berrr/auth/GET_CAPTCHA_URL_SUCCESS';

const initialState = {
	userId: null,
	email: null,
	login: null,
	isAuth: false,
	captchaUrl: null
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_USER_DATA:
		case GET_CAPTCHA_URL_SUCCESS:
			return {
				...state,
				...action.payload
			}
		default:
			return state;
	}
};

export const setAuthUserData = (userId, login, email, isAuth) => (
	{
		type: SET_USER_DATA,
		payload: {userId, login, email, isAuth}
	}
);
export const getCaptchaUrlSuccess = (captchaUrl) => (
	{
		type: GET_CAPTCHA_URL_SUCCESS,
		payload: {captchaUrl}
	}
);

export const getAuthUserData = () => async (dispatch) => {
	const response = await authAPI.me();
	if (response.resultCode === 0) {
		const {id: userId, login, email} = response.data;
		dispatch(setAuthUserData(userId, login, email, true));
	}
};

export const login = (formData) => async (dispatch) => {
	const response = await authAPI.login(formData);
	if (response.resultCode === 0) {
		dispatch(getAuthUserData());
	} else {
		if( response.resultCode === 10 ) {
			dispatch(getCaptchaUrl());
		}
		let message = response.messages.length > 0 ? response.messages[0] : "Some error";
		dispatch(stopSubmit('LoginForm', {_error: message}));
	}
};

export const getCaptchaUrl = () => async (dispatch) => {
	const response = await securityApi.getCaptchaUrl();
	const captchaUrl = response.url;
	dispatch(getCaptchaUrlSuccess(captchaUrl));
};

export const logout = () => async (dispatch) => {
	const response = await authAPI.logout();
	if (response.resultCode === 0) {
		dispatch(setAuthUserData(null, null, null, false));
	}
};

export default authReducer;