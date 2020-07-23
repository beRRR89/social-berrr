import {connect} from "react-redux";
import {setCurrentPage} from "../../redux/usersReducer";
import React, {Component} from "react";
import Users from "./Users";
import Preloader from "../Preloader";
import {follow, unfollow, requestUsers} from "../../redux/usersReducer";
import {compose} from "redux";
import {
	getCurrentPage,
	getFollowingInProgress,
	getIsFetching,
	getPageSize,
	getTotalUsersCount,
	getUsers
} from "../../redux/Selectors/usersSelector";

class UsersContainer extends Component {

	componentDidMount() {
		const {currentPage, pageSize} = this.props;
		this.props.getUsers(currentPage, pageSize);
	};

	onPageChanged = (pageNumber) => {
		const {pageSize} = this.props;
		this.props.getUsers(pageNumber, pageSize);
	};

	render() {
		const {users, unfollow, follow, totalUsersCount, pageSize, currentPage, isFetching, followingInProgress} = this.props;
		return (
			<>{
				isFetching ? <Preloader/> : null }

					<Users
						currentPage={currentPage}
						users={users}
						totalUsersCount={totalUsersCount}
						pageSize={pageSize}
						follow={follow}
						unfollow={unfollow}
						onPageChanged={this.onPageChanged}
						isFetching={isFetching}
						followingInProgress={followingInProgress}
					/>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		users: getUsers(state),
		pageSize: getPageSize(state),
		totalUsersCount: getTotalUsersCount(state),
		currentPage: getCurrentPage(state),
		isFetching: getIsFetching(state),
		followingInProgress: getFollowingInProgress(state)
	}
};
export default compose(
	connect(mapStateToProps, {
		unfollow,
		follow,
		setCurrentPage,
		getUsers: requestUsers
	})
)(UsersContainer);