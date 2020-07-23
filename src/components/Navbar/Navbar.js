import React from 'react';
import styles from './Navbar.module.scss';
import {NavLink} from "react-router-dom";

const Navbar = (props) => {
	return (
		<nav className={styles.nav}>
			<div className={styles.item}>
				<NavLink to={'/profile'} activeClassName={styles.active}>Profile</NavLink>
			</div>
			<div className={styles.item}>
				<NavLink to={'/dialogs'} activeClassName={styles.active}>Message</NavLink>
			</div>
			<div className={styles.item}>
				<NavLink to={'/users'} activeClassName={styles.active}>Users</NavLink>
			</div>
		</nav>
	)
};

export default Navbar;
