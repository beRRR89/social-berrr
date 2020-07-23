import {addPostActionCreator} from "../../../redux/profileReducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";

const MapStateToProps = (state) => {
	return {
		posts: state.profilePage.posts,
		newMessage: state.profilePage.newMessage
	};
};

const MapDispatchToProps = (dispatch) => {
	return {
		addPost: (postText) => dispatch(addPostActionCreator(postText))
	};
};
const MyPostsContainer = connect(MapStateToProps, MapDispatchToProps)(MyPosts);
export default MyPostsContainer;
