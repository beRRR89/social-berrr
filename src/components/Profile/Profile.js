import React from 'react';
import ProfileInfo from "./ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";

const Profile = (props) => {
	return (
		<div>
			<ProfileInfo
				status={props.status}
				isOwner={props.isOwner}
				updateUserStatus={props.updateUserStatus}
				profile={props.profile}
				savePhoto={props.savePhoto}
				saveProfile={props.saveProfile}
			/>
			<MyPostsContainer/>
		</div>
	)
};

export default Profile;
