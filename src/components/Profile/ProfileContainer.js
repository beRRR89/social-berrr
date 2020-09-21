import React, {Component} from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {getUserProfile, savePhoto, saveProfile} from "../../redux/profileReducer";
import {compose} from "redux";
import {getUserStatus} from "../../redux/profileReducer";
import {updateUserStatus} from "../../redux/profileReducer";

class ProfileContainer extends Component {
	refreshProfile = () => {
		let userId = this.props.match.params.userId;
		if( !userId) {
			userId = this.props.authorizedUserId;
			if( !userId ) {
				this.props.history.push('/login');
			}
		}
		if (!userId) {
			console.error("ID should exists in URI params or in state ('authorizedUserId')");
		} else {
			this.props.getUserProfile(userId);
			this.props.getUserStatus(userId);
		}
	}

	componentDidMount() {
		this.refreshProfile();
	};

	componentDidUpdate(prevProps, prevState, snapshot) {
		if(this.props.match.params.userId !== prevProps.match.params.userId) {
			this.refreshProfile();
		}
	}

	render() {
		return (
			<div>
				<Profile {...this.props} isOwner={!this.props.match.params.userId}/>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return ({
		profile: state.profilePage.profile,
		status: state.profilePage.status,
		authorizedUserId: state.auth.userId,
		isAuth: state.auth.isAuth
	})
};

export default compose(
	connect(mapStateToProps, {getUserProfile, getUserStatus, updateUserStatus, savePhoto, saveProfile}),
	withRouter
)(ProfileContainer);