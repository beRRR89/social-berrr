import {usersAPI} from "../api/api";
import {updateObjectInArray} from "../utils/helpers/objectHelpers";

export const FOLLOW = 'social-berrr/user/FOLLOW';
export const UNFOLLOW = 'social-berrr/user/UNFOLLOW';
export const SET_USERS = 'social-berrr/user/SET-USERS';
export const SET_CURRENT_PAGE = 'social-berrr/user/SET-CURRENT-PAGE';
export const SET_TOTAL_USERS_COUNT = 'social-berrr/user/SET-TOTAL-USERS-COUNT';
export const TOGGLE_IS_FETCHING = 'social-berrr/user/TOGGLE-IS-FETCHING';
export const TOGGLE_IS_FOLLOWING_PROGRESS = 'social-berrr/user/TOGGLE-IS-FOLLOWING-PROGRESS';


const initialState = {
	users: [],
	pageSize: 5,
	totalUsersCount: 0,
	currentPage: 1,
	isFetching: false,
	followingInProgress: []
};

const usersReducer = (state = initialState, action) => {

	switch (action.type) {
		case FOLLOW :
			return {
				...state,
				users: updateObjectInArray(state.users, action.userId, 'id', {followed:true})
			};
		case UNFOLLOW :
			return {
				...state,
				users: updateObjectInArray(state.users, action.userId, 'id', {followed:false})
			};
		case SET_USERS:
			return {
				...state,
				users: [...action.users]
			};
		case SET_CURRENT_PAGE:
			return {
				...state,
				currentPage: action.currentPage
			};
		case SET_TOTAL_USERS_COUNT:
			return {
				...state,
				totalUsersCount: action.totalUsersCount
			};
		case TOGGLE_IS_FETCHING:
			return {
				...state,
				isFetching: action.isFetching
			};
		case TOGGLE_IS_FOLLOWING_PROGRESS:
			return {
				...state,
				followingInProgress: action.followingInProgress
					? [...state.followingInProgress, action.userId]
					: state.followingInProgress.filter(id => id !== action.userId)
			};
		case 'FAKE' :
			return {
				...state,
				fake: state.fake + 1
			}
		default:
			return state;
	}
};

export const followSuccess = (userId) => (
	{
		type: FOLLOW,
		userId
	}
);
export const unfollowSuccess = (userId) => (
	{
		type: UNFOLLOW,
		userId
	}
);

export const setUsers = (users) => (
	{
		type: SET_USERS,
		users
	}
);

export const setCurrentPage = (currentPage) => (
	{
		type: SET_CURRENT_PAGE,
		currentPage
	}
);
export const setTotalUsersCount = (totalUsersCount) => (
	{
		type: SET_TOTAL_USERS_COUNT,
		totalUsersCount
	}
);

export const toggleIsFetching = (isFetching) => (
	{
		type: TOGGLE_IS_FETCHING,
		isFetching
	}
);

export const toggleFollowingProgress = (followingInProgress, userId) => (
	{
		type: TOGGLE_IS_FOLLOWING_PROGRESS,
		followingInProgress,
		userId
	}
);

const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {
	dispatch(toggleFollowingProgress(true, userId));
	const response = await apiMethod(userId);
	if (response.resultCode === 0) {
		dispatch(actionCreator(userId));
	}
	dispatch(toggleFollowingProgress(false, userId));
};

export const follow = (userId) => async (dispatch) => {
	dispatch(toggleFollowingProgress(true, userId));
	await followUnfollowFlow(dispatch,userId, usersAPI.follow, followSuccess);
};

export const unfollow = (userId) => async (dispatch) => {
	dispatch(toggleFollowingProgress(true, userId));
	await followUnfollowFlow(dispatch,userId, usersAPI.unfollow, unfollowSuccess);
}

export const requestUsers = (page, pageSize) => async (dispatch) => {
	dispatch(toggleIsFetching(true));
	dispatch(setCurrentPage(page));
	const response = await usersAPI.getUsers(page, pageSize);
	dispatch(toggleIsFetching(false));
	dispatch(setUsers(response.items));
	dispatch(setTotalUsersCount(response.totalCount));
};

export default usersReducer;