import {profileAPI, usersAPI} from "../api/api";

const ADD_POST = 'social-berrr/profile/ADD-POST';
const DELETE_POST = 'social-berrr/profile/DELETE-POST';
const SET_USER_PROFILE = 'social-berrr/profile/SET-USER-PROFILE';
const SET_USER_STATUS = 'social-berrr/profile/SET-USER-STATUS';

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
		case SET_USER_STATUS:
			return {
				...state,
				status: action.status
			};
		case DELETE_POST: {
			return {
				...state,
				posts: state.posts.filter(el => el.id !== action.id)
			}
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

export const getUserStatus = (userId) => async (dispatch) => {
	const response = await profileAPI.getStatus(userId);
	dispatch(setUserStatus(response));
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

export default profileReducer;