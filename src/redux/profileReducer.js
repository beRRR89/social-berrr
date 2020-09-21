import {profileAPI, usersAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const ADD_POST = 'social-berrr/profile/ADD-POST';
const DELETE_POST = 'social-berrr/profile/DELETE-POST';
const SET_USER_PROFILE = 'social-berrr/profile/SET-USER-PROFILE';
const SET_USER_STATUS = 'social-berrr/profile/SET-USER-STATUS';
const SAVE_PHOTOS = 'social-berrr/profile/SAVE-PHOTOS';
const MERGE_PROFILE = 'social-berrr/profile/MERGE-PROFILE';

const initialState = {
	profile: null,
	posts: [
		{id: 1, message: "So nice!", likesCount: 15},
		{id: 2, message: "Well, well, well", likesCount: 0},
		{id: 3, message: "Helllllloooooo!", likesCount: 1},
		{id: 4, message: "Hey hoo", likesCount: 99}
	],
	status: ""
};

const profileReducer = (state = initialState, action) => {

	switch (action.type) {
		case ADD_POST: {
			let newPost = {
				id: 5,
				message: action.postText,
				likesCount: 9
			};
			return ({
				...state,
				posts: [...state.posts, newPost]
			});
		}
		case SET_USER_PROFILE:
			return {
				...state,
				profile: action.profile
			};
		case MERGE_PROFILE:
			return {
				...state,
				profile: {...state.profile, ...action.profile}
			}
		case SET_USER_STATUS:
			return {
				...state,
				status: action.status
			};
		case DELETE_POST:
			return {
				...state,
				posts: state.posts.filter(el => el.id !== action.id)
			}
		case SAVE_PHOTOS:
			return {
				...state,
				profile: {...state.profile, photos: action.photos}
			}
		default:
			return state;
	}
};

export const addPostActionCreator = (postText) => {
	return {
		type: ADD_POST,
		postText
	}
};

export const setUserProfile = (profile) => {
	return {
		type: SET_USER_PROFILE,
		profile
	}
};

export const setUserStatus = (status) => {
	return {
		type: SET_USER_STATUS,
		status
	}
};
export const deletePost = (postId) => {
	return {
		type: DELETE_POST,
		postId
	}
};

export const savePhotoSuccess = (photos) => {
	return {
		type: SAVE_PHOTOS,
		photos
	}
}
export const mergeProfile = (profile) => {
	return {
		type: MERGE_PROFILE,
		profile
	}
}

export const getUserStatus = (userId) => async (dispatch) => {
	const response = await profileAPI.getStatus(userId);
	if (response.resultCode === 0) {
		dispatch(setUserStatus(response));
	}
};

export const updateUserStatus = (status) => async (dispatch) => {
	const response = await profileAPI.updateStatus(status);
	if (response.resultCode === 0) {
		dispatch(setUserStatus(status));
	}
};

export const getUserProfile = (userId) => async (dispatch) => {
	const response = await usersAPI.getProfile(userId);
	dispatch(setUserProfile(response));
};
export const savePhoto = (file) => async (dispatch) => {
	const response = await profileAPI.setPhoto(file);
	if (response.resultCode === 0) {
		dispatch(savePhotoSuccess(response.data.photos));
	}
};

export const saveProfile = (profile) => async (dispatch, getState) => {
	const userId = getState().auth.userId;
	const response = await profileAPI.saveProfile(profile);
	if (response.resultCode === 0) {
		dispatch(getUserProfile(userId));
	} else {
		let message = response.messages.length > 0 ? response.messages[0] : "Some error";
		dispatch(stopSubmit('profileDataForm', {_error: message}));
		return Promise.reject(message);
	}
};
export default profileReducer;