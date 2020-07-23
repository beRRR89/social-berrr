import React, {useEffect, useState} from "react";

const ProfileStatus = (props) => {

	let [editMode, setEditMode] = useState(false);
	let [status, setStatus] = useState(props.status);

	useEffect( () => {
		setStatus(props.status);
	}, [props.status]);

	const activateEditMode = () => {
		setEditMode(true);
	};

	const deactivateEditMode = () => {
		setEditMode(false);
		props.updateUserStatus(status);
	};

	const onStatusChange = (event) => {
	   setStatus(event.currentTarget.value);
	};

	return (
		<div>
			{
				!editMode &&
				<div>
					<span onDoubleClick={activateEditMode}>{props.status || "------"}</span>
				</div>
			}
			{
				editMode &&
				<div>
					<input type="text" autoFocus={true} onBlur={deactivateEditMode} onChange={onStatusChange} value={status}/>
				</div>
			}
		</div>
	)
}

export default ProfileStatus;