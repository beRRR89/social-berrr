import {reduxForm} from "redux-form";
import React from "react";
import {createField, Input, Textarea} from "../../common/FormControls/FormControls";

const ProfileDataForm = ({handleSubmit, initialValues, profile: {contacts}, error}) => {
	console.log(error);
	return (
		<form onSubmit={handleSubmit}>
			<button>Save</button>
			<div>
				<b>Full name:</b>
				{createField('Full name', 'fullName', [], Input)}
			</div>
			<div>
				<b>About Me:</b>
				{createField('About Me', 'aboutMe', [], Input)}
			</div>
			<div>
				<b>Looking for a job:</b>
				{createField('', 'lookingForAJob', [], Input, {type: "checkbox"})}
			</div>
			<div>
				<b>Professionals skills:</b>
				{createField('Professional skills', 'lookingForAJobDescription', [], Textarea)}
			</div>
			<div>
				Contacts {Object.keys(contacts).map(key => {
				return <div key={key}><b>{key}:</b> {createField(key, `contacts.${key}`, [], Input)}</div>
				})}
			</div>
			<div>{ error &&
				<div>{error}</div>
			}
			</div>
		</form>
	)
}

export const ProfileDataFormRedux = reduxForm({
	form: 'profileDataForm'
})(ProfileDataForm);