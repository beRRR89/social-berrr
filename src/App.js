import React, {Component, Suspense} from 'react';
import Navbar from "./components/Navbar";
import './App.scss';
import {BrowserRouter, Route} from "react-router-dom";
import HeaderContainer from "./components/Header/HeaderContainer";
import {connect, Provider} from "react-redux";
import {Redirect, Switch, withRouter} from "react-router";
import {compose} from "redux";
import {initializeApp, initializeError} from "./redux/appReducer";
import Preloader from "./components/Preloader";
import store from "./redux/reduxStore";

const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"));
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"));
const UsersContainer = React.lazy(() => import("./components/Users/UsersContainer"));
const LoginPage = React.lazy(() => import("./components/Login"));

class App extends Component {
	catchAllUnhandledErrors = (promiseRejection) => {
		this.props.initializeError(promiseRejection.reason.message);
	}
	componentDidMount() {
		this.props.initializeApp();
		window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);
	}

	componentWillUnmount() {
		window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors);
	}

	render() {
		if (!this.props.initialized) {
			return (<Preloader/>)
		}
		console.log(this.props.globalError);
		if( this.props.globalError ) {
			return <div>{this.props.globalError}</div>
		}
		return (
			<div className={`app-wrapper`}>
				<HeaderContainer/>
				<Navbar/>
				<div className={`app-wrapper-content`}>

					<Suspense fallback={<div>Loading...</div>}>
						<Switch>
							<Redirect exact from={'/'} to={'/profile'} render={() => <ProfileContainer/>}/>
							<Route path={'/dialogs'} render={() => <DialogsContainer/>}/>
							<Route path={'/profile/:userId?'} render={() => <ProfileContainer/>}/>
							<Route path={'/users'} render={() => <UsersContainer/>}/>
							<Route path={'/login/facebook'} render={() => <div>facebook</div>}/>
							<Route exact path={'/login'} render={() => <LoginPage/>}/>
							<Route path={'*'} render={() => <div>404 page</div>}/>
						</Switch>
					</Suspense>

				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		initialized: state.app.initialized,
		globalError: state.app.globalError
	}
}

const AppContainer = compose(
	withRouter,
	connect(mapStateToProps, {initializeApp, initializeError})
)(App);

const MainApp = (props) => {
	return (
		<BrowserRouter>
			<Provider store={store}>
				<AppContainer/>
			</Provider>
		</BrowserRouter>
	)
}

export default MainApp;