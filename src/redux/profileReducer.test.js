import profileReducer, {addPostActionCreator, deletePost} from "./profileReducer";
let state = {
	profile: null,
	posts: [
		{id: 1, message: "So nice!", likesCount: 15},
		{id: 2, message: "Well, well, well", likesCount: 0},
		{id: 3, message: "Helllllloooooo!", likesCount: 1},
		{id: 4, message: "Hey hoo", likesCount: 99}
	],
	status: ""
};

test('length of posts after add',() => {
	// 1. test data
	let action = addPostActionCreator('new post test');

	// 2. action
	let newState = profileReducer(state, action);

	// 3. expectation
	expect(newState.posts.length).toBe(5);
});

test('message of new post should be correct',() => {
	// 1. test data
	let action = addPostActionCreator('new post test');

	// 2. action
	let newState = profileReducer(state, action);

	// 3. expectation
	expect(newState.posts[4].message).toBe("new post test");
});

test(`after deleting length shouldn't be decrement if id is n't correct`,() => {
	// 1. test data
	let action = deletePost(1000);

	// 2. action
	let newState = profileReducer(state, action);

	// 3. expectation
	expect(newState.posts.length).toBe(4);
})

