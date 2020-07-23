import React, {Suspense} from 'react';
import Navbar from "./components/Navbar";
import './App.scss';
import {BrowserRouter, Route} from "react-router-dom";
import HeaderContainer from "./components/Header/HeaderContainer";
import {connect, Provider} from "react-redux";
import {withRouter} from "react-router";
import {compose} from "redux";
import {initializeApp} from "./redux/appReducer";
import Preloader from "./components/Preloader";
import store from "./redux/reduxStore";

const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"));
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"));
const UsersContainer = React.lazy(() => import("./components/Users/UsersContainer"));
const LoginPage = React.lazy(() => import("./components/Login"));

class App extends React.Component {

	componentDidMount() {
		this.props.initializeApp();
	}

	render() {
		if (!this.props.initialized) {
			return (<Preloader/>)
		}
		return (
			<div className={`app-wrapper`}>
				<HeaderContainer/>
				<Navbar/>
				<div className={`app-wrapper-content`}>
					<Suspense fallback={<div>Loading...</div>}>
						<Route exact path={'/dialogs'} render={() => <DialogsContainer/>}/>
						<Route path={'/profile/:userId?'} render={() => <ProfileContainer/>}/>
						<Route exact path={'/users'} render={() => <UsersContainer/>}/>
						<Route exact path={'/login'} render={() => <LoginPage/>}/>
					</Suspense>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		initialized: state.app.initialized
	}
}

const AppContainer = compose(
	withRouter,
	connect(mapStateToProps, {initializeApp})
)(App);

const MainApp = (props) => {
	return (
		<BrowserRouter basename={process.env.PUBLIC_URL}>
			<Provider store={store}>
				<AppContainer/>
			</Provider>
		</BrowserRouter>
	)
}

export default MainApp;