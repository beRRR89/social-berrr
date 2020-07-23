import React from "react";
import {reduxForm} from "redux-form";
import {required} from "../../utils/validators/validators";
import {createField, Input} from "../common/FormControls/FormControls";
import styles from '../common/FormControls/FormControls.module.scss';

const LoginForm = ({handleSubmit, error}) => {
	return <form onSubmit={handleSubmit}>
		{createField("Email", "email", [required], Input)}
		{createField("Password", "password", [required], Input, {type: "password"})}
		{createField(null, "rememberMe", [], Input, {type: "checkbox"}, "Remember Me")}
		{error &&
		<div className={styles.errorMessage}>
			{error}
		</div>
		}
		<div>
			<button type={"submit"}>Login</button>
		</div>
	</form>;
};

export default reduxForm({
	form: 'LoginForm',
	touchOnChange: true,
	touchOnBlur: true
})(LoginForm);