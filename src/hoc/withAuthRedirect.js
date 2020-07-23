import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

const mapStateToPropsRedirect = (state) => {
	return {
		isAuth: state.auth.isAuth
	}
};

export const withAuthRedirect = (Wrapper) => {
	class RedirectComponent extends Component {
		render(){
			if( !this.props.isAuth ) {
				return <Redirect to='/login'/>
			}
			return (
				<Wrapper {...this.props}/>
			)
		}
	}

	return connect(mapStateToPropsRedirect)(RedirectComponent);
};