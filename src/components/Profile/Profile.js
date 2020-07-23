import React from 'react';
import ProfileInfo from "./ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";

const Profile = (props) => {
	console.log('test');
	return (
		<div>
			<ProfileInfo status={props.status} updateUserStatus={props.updateUserStatus} profile={props.profile}/>
			<MyPostsContainer/>
		</div>
	)
};

export default Profile;
