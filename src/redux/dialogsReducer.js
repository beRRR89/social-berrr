const SEND_MESSAGE = 'social-berrr/dialogs/SEND-MESSAGE';
const UPDATE_NEW_MESSAGE_BODY = 'social-berrr/dialogs/UPDATE-NEW-MESSAGE-BODY';

const initialState = {
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
	]
};

const dialogsReducer = (state = initialState, action) => {
	switch (action.type) {
		case UPDATE_NEW_MESSAGE_BODY:
			return ({
				...state,
				newMessageBody: action.body
			});
		case SEND_MESSAGE:
			return ({
				...state,
				newMessageBody: "",
				messages: [...state.messages, {id: 6, message: action.message}]
			});
		default:
			return state;
	}

};

export const updateNewMessageBodyCreator = (message) => {
	return {
		type: UPDATE_NEW_MESSAGE_BODY,
		body: message
	}
};

export const sendMessageCreator = (message) => {
	return {
		type: SEND_MESSAGE,
		message
	}
};

export default dialogsReducer;