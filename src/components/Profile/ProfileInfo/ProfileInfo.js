import React, {useState} from 'react';
import styles from './ProfileInfo.module.scss';
import Preloader from "../../Preloader";
import avatarImg from "../../../img/user.png";
import ProfileStatus from "./ProfileStatus";
import {ProfileDataFormRedux} from "./ProfileDataForm";

const ProfileInfo = ({profile, status, updateUserStatus, isOwner, savePhoto, saveProfile}) => {
	const [editMode, setEditMode] = useState(false);

	if (!profile) {
		return <Preloader/>
	}
	const {photos} = profile;

	const toEditMode = () => {
		setEditMode(true);
	};

	const mainPhotoSelected = (event) => {
		if (event.target.files.length > 0) {
			savePhoto(event.target.files[0]);
		}
	};

	const onSubmit = (formData) => {
		saveProfile(formData)
			.then(() => setEditMode(false));
	}

	return (
		<div>
			<div className={styles.mainImgWrapper}>
				<img src={`https://w.wallhaven.cc/full/n6/wallhaven-n65epw.png`} alt={`main-content`}
					 className={styles.img}/>
			</div>
			<div className={styles.descriptionBlock}>
				<img src={photos.large || avatarImg} alt="avatar"/>
				{isOwner && <input type="file" onChange={mainPhotoSelected}/>}
				{editMode ? <ProfileDataFormRedux initialValues={profile} profile={profile} onSubmit={onSubmit}/> :
					<ProfileData profile={profile} isOwner={isOwner} toEditMode={toEditMode}/>}
			</div>
			<ProfileStatus status={status} updateUserStatus={updateUserStatus}/>
		</div>
	);
};

const Contact = ({title, value}) => {
	return <div><b>{title}:</b>{value}</div>
};

const ProfileData = ({isOwner, toEditMode, profile: {fullName, aboutMe, lookingForAJob, lookingForAJobDescription, contacts}}) => {
	return (
		<div>
			{isOwner && <div>
				<button onClick={toEditMode}>Edit Info</button>
			</div>}
			<div>
				<span>Fullname: {fullName}</span>
			</div>
			<div>
				<span>About Me: {aboutMe}</span>
			</div>
			<div>
				<span>Looking for a job: {lookingForAJob ? 'Yes' : 'No'}</span>
			</div>
			<div>
				<span>Professional skills: {lookingForAJobDescription}</span>
			</div>
			<div>
				<div>Contacts {Object.keys(contacts).map(key => {
					return <Contact key={key} title={key} value={contacts[key]}/>
				})}</div>
			</div>
		</div>
	)
};

export default ProfileInfo;