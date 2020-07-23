import profileReducer from "./profileReducer";
import sidebarReducer from "./sidebarReducer";
import dialogsReducer from "./dialogsReducer";

let store = {
	_state: {
		profilePage: {
			posts: [
				{id: 1, message: "So nice!", likesCount: 15},
				{id: 2, message: "Well, well, well", likesCount: 0}
			],
			newMessage: "Test"
		},
		dialogPage: {
			dialogs: [
				{id: 1, name: "Katkov Alex"},
				{id: 2, name: "Koshel Artyom"},
				{id: 3, name: "Daiel Tal"},
				{id: 4, name: "Shulga Alex"},
				{id: 5, name: "Korotkevich Artyom"},
				{id: 6, name: "Vasilii Piun"}
			],
			messages: [
				{id: 1, message: "Hello"},
				{id: 2, message: "Hi!"},
				{id: 3, message: "How are you?"},
				{id: 4, message: "What is this?"},
				{id: 5, message: "Nice hat!"},
				{id: 6, message: "What are you doing?"},
			],
			newMessageBody: ""
		},
		sidebar: {
			friends: [
				{id: 1, name: "Alex"},
				{id: 2, name: "Dima"},
				{id: 3, name: "Dasha"}
			]
		}
	},
	_callSubscriber() {
		console.log("no subscriber");
	},
	getState() {
		return this._state;
	},
	subscribe(observer) {
		this._callSubscriber = observer;
	},
	dispatch(action) {
		this._state.profilePage = profileReducer(this._state.profilePage, action);
		this._state.dialogsPage = dialogsReducer(this._state.dialogPage, action);
		this._state.sidebar = sidebarReducer(this._state.sidebar, action);
		this._callSubscriber(this._state);
	}
};

window.store = store;

export default store;