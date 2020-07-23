import axios from "axios";

const instance = axios.create({
	baseURL: 'https://social-network.samuraijs.com/api/1.0/',
	responseType: 'json',
	withCredentials: true,
	headers: {
		"API-KEY": "ed29ee6c-be93-4eec-a6b7-fad1faaa2120"
	}
});

export const usersAPI = {
	getUsers: (currentPage = 1, pageSize = 10) => {
		return instance.get(`users?page=${currentPage}&count=${pageSize}`)
			.then(response => {
				return response.data
			})
	},
	follow: (userId) => {
		return instance.post(`follow/${userId}`, null)
			.then(response => {
				return response.data;
			})
	},
	unfollow: (userId) => {
		return instance.delete(`follow/${userId}`)
			.then(response => {
				return response.data;
			})
	},
	getProfile: (userId) => {
		console.warn('Outdated method. Please use profileAPI object.');
		return profileAPI.getProfile(userId);
	}
};

export const authAPI = {
	me: () => {
		return instance.get(`auth/me`)
			.then(response => {
				return response.data;
			});
	},
	login: ({email, password, rememberMe = false}) => {
		return instance.post(`auth/login`, {
			email,
			password,
			rememberMe
		}).then(response => {
			return response.data;
		});
	},
	logout: () => {
		return instance.delete(`auth/login`)
			.then( response => {
				return response.data;
			})
	}
};

export const profileAPI = {
	getProfile: (userId) => {
		return instance.get(`profile/${userId}`)
			.then(response => {
				return response.data;
			});
	},
	getStatus: (userId) => {
		return instance.get(`profile/status/${userId}`)
			.then(response => {
				return response.data;
			});
	},
	updateStatus: (status) => {
		return instance.put(`profile/status`, {status})
			.then(response => {
				return response.data;
			});
	}
};