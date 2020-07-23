import React from 'react';
import styles from "./Header.module.scss";
import {NavLink} from "react-router-dom";

const Header = ({isAuth, login, logout}) => {
	return (
		<header className={styles.header}>
			<img alt="logo"
				 src="https://www.freelogodesign.org/file/app/client/thumb/38def5fa-b8ab-4a80-aaa6-5bd3897a1c22_200x200.png?1582029857631"/>
			<div className={styles.loginBlock}>
				{
					isAuth ? (
						<span>{login} - <button onClick={logout}>Logout</button></span>
					) : (
						<NavLink to="/login">Login</NavLink>
					)
				}
			</div>
		</header>
	);
};

export default Header;
