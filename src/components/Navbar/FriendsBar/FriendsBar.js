import React from 'react';

const FriendsBar = (props) => {
	return (
		<div>
			<div className="avatar"></div>
			<div className="name">{props.friend.name}</div>
		</div>
	);
};

export default FriendsBar;