import React, {Component} from 'react';
import LoginForm from "./LoginForm";
import {connect} from "react-redux";
import {login} from "../../redux/authReducer";
import {Redirect} from "react-router";


class Login extends Component {

	onSubmit = (formData) => {
		this.props.login(formData);
	};

	render() {
		if(this.props.isAuth ) {
			return <Redirect to={`/profile`}/>
		}
		return (
			<div>
				<h1>Login</h1>
				<LoginForm onSubmit={this.onSubmit}/>
			</div>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		isAuth: state.auth.isAuth
	}
}
export default connect(mapStateToProps, {login})(Login);