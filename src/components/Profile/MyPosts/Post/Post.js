import React from 'react';
import styles from "./Post.module.scss";
import Avatar from "../../../../img/KannaWhat.png";

const Post = ({id, message, likesCount}) => {
	return (
		<div key={id} className={styles.post}>
			<img alt="avatar" src={Avatar}/>
			{message}
			{likesCount}
		</div>
	)
};


export default Post;
