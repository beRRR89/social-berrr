import React from 'react';
import styles from "../Dialogs.module.scss";
import {NavLink} from "react-router-dom";

const DialogItem = ({id, name}) =>{
		return (
			<div key={id} className={styles.dialog + ' ' + styles.active}>
				<NavLink to={`/dialogs/${id}`}>{name}</NavLink>
			</div>
		)
};

export default DialogItem;
