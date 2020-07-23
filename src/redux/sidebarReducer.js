const initialState = {
	friends: [
		{id: 1, name: "Alex"},
		{id: 2, name: "Dima"},
		{id: 3, name: "Dasha"}
	]
};
const sidebarReducer = (state = initialState, action) => {
	return state;
};

export default sidebarReducer;