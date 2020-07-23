import React from 'react';
import styles from "./Users.module.scss";
import avatarImg from "../../img/user.png";
import {NavLink} from "react-router-dom";

const User = ({user, followingInProgress, follow, unfollow}) => {
	return (
		<div>
			<span>
				<div className={styles.avatarItem}>
					<NavLink to={`/profile/${user.id}`}>
						<img src={user.photos.small !== null ? user.photos.small : avatarImg} alt='Avatar'/>
					</NavLink>
				</div>
				<div>
					{user.followed ?
						<button disabled={followingInProgress.some(id => id === user.id)}
								onClick={() => unfollow(user.id)}>Unfollow</button> :
						<button disabled={followingInProgress.some(id => id === user.id)}
								onClick={() => follow(user.id)}>Follow</button>
					}
				</div>
			</span>
			<span>
				<div>
					<div>{user.name}</div>
					<div>{user.status}</div>
				</div>
				<div>
					<div>{"u.location.country"} {"u.location.city"}</div>
				</div>
			</span>
		</div>
	);
};

export default User;