import React from 'react';
import styles from "../Dialogs.module.scss";

const Message = ({message, id}) => {
	return (
		<div key={id} className={styles.message}>
			{message}
		</div>
	)
};

export default Message;
