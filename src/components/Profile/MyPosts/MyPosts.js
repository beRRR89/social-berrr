import React from 'react';
import styles from './MyPosts.module.scss';
import Post from "./Post";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {Textarea} from "../../common/FormControls/FormControls";

const maxLength10 = maxLengthCreator(10);

function MyPosts(props) {

	let {addPost, posts} = props;

	let postElements = posts.map(post => <Post key={post.id} message={post.message} likesCount={post.likesCount}/>);

	let AddPost = ({postText}) => {
		addPost(postText);
	};
	return (
		<div className={styles.postsBlock}>
			My posts
			<div>
				<div>
					<AddNewPostFormRedux onSubmit={AddPost}/>
				</div>
			</div>
			<div className={styles.posts}>
				{postElements}
			</div>
		</div>
	)
}

const AddNewPostForm = (props) => {
	return (
		<form onSubmit={props.handleSubmit}>
			<Field component={Textarea}  placeholder="Post message" name="postText" validate={[required, maxLength10]}/>
			<button>Add Post</button>
		</form>
	)
};

const AddNewPostFormRedux = reduxForm({
	form: 'ProfileAddNewPostForm',
	touchOnChange: true,
	touchOnBlur: true
})(AddNewPostForm);

export default MyPosts;
