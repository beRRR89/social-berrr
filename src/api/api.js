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
			.then(response => response.data);
	},
	follow: (userId) => {
		return instance.post(`follow/${userId}`, null)
			.then(response => response.data);
	},
	unfollow: (userId) => {
		return instance.delete(`follow/${userId}`)
			.then(response => response.data);
	},
	getProfile: (userId) => {
		console.warn('Outdated method. Please use profileAPI object.');
		return profileAPI.getProfile(userId);
	}
};

export const authAPI = {
	me: () => {
		return instance.get(`auth/me`)
			.then(response => response.data);
	},
	login: ({email, password, rememberMe = false, captcha = null}) => {
		return instance.post(`auth/login`, {
			email,
			password,
			rememberMe,
			captcha
		}).then(response => response.data);
	},
	logout: () => {
		return instance.delete(`auth/login`)
			.then(response => response.data);
	}
};

export const profileAPI = {
	getProfile: (userId) => {
		return instance.get(`profile/${userId}`)
			.then(response => response.data);
	},
	getStatus: (userId) => {
		return instance.get(`profile/status/${userId}`)
			.then(response => response.data);
	},
	updateStatus: (status) => {
		return instance.put(`profile/status`, {status})
			.then(response => response.data);
	},
	setPhoto: (photoFile) => {
		const formData = new FormData();
		formData.append('image', photoFile);
		return instance.put(`/profile/photo`, formData)
			.then(response => response.data);
	},
	saveProfile: (profile) => {
		return instance.put(`/profile`, profile)
			.then(response => response.data);
	}
};

export const securityApi = {
	getCaptchaUrl: () => {
		return instance.get(`security/get-captcha-url`)
			.then(response => response.data);
	}
}