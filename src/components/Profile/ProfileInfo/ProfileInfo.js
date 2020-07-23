import React from 'react';
import styles from './ProfileInfo.module.scss';
import Preloader from "../../Preloader";
import avatarImg from "../../../img/user.png";
import ProfileStatus from "./ProfileStatus";

const ProfileInfo = ({profile, status, updateUserStatus}) => {
	if (!profile) {
		return <Preloader/>
	}
	const {fullName, photos} = profile;
	return (
		<div>
			<div className={styles.mainImgWrapper}>
				<img src={`https://w.wallhaven.cc/full/n6/wallhaven-n65epw.png`} alt={`main-content`}
					 className={styles.img}/>
			</div>
			<div className={styles.descriptionBlock}>
				<img src={photos.large ? photos.large : avatarImg} alt="avatar"/>
				<div>
					<span>{fullName}</span>
				</div>
			</div>
			<ProfileStatus status={status} updateUserStatus={updateUserStatus}/>
		</div>
	);
};

export default ProfileInfo;