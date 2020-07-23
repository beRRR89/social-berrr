import React, {Component} from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {getUserProfile} from "../../redux/profileReducer";
import {compose} from "redux";
import {getUserStatus} from "../../redux/profileReducer";
import {updateUserStatus} from "../../redux/profileReducer";

class ProfileContainer extends Component {

	componentDidMount() {
		let userId = this.props.match.params.userId;
		if( !userId) {
			userId = this.props.authorizedUserId;
			if( !userId ) {
				this.props.history.push('/login');
				return;
			}
		}
		this.props.getUserProfile(userId);
		this.props.getUserStatus(userId);
	};

	render() {
		return (
			<div>
				<Profile {...this.props}/>
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
	connect(mapStateToProps, {getUserProfile, getUserStatus, updateUserStatus}),
	withRouter
)(ProfileContainer);