import React from 'react';
import Pagination from "../common/Pagination/Pagination";
import User from "./User";

const Users = ({
				  currentPage,
				  users,
				  follow,
				  totalUsersCount,
				  pageSize,
				  unfollow,
				  onPageChanged,
				  followingInProgress
			  }) => {
	return (
		<div>
			<Pagination currentPage={currentPage} onPageChanged={onPageChanged} totalItemsCount={totalUsersCount}
						pageSize={pageSize} portionSize={5}/>
			{
				users.map((u) => <User
									key={u.id}
									user={u}
									followingInProgress={followingInProgress}
									follow={follow}
									unfollow={unfollow}
				/>)
			}
		</div>
	);
};

export default Users;