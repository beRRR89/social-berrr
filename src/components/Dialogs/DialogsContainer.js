import {sendMessageCreator} from "../../redux/dialogsReducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

const mapStateToProps = (state) => {
	return {
		dialogsPage: state.dialogsPage
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		sendMessage: (message) => dispatch(sendMessageCreator(message))
	}
};


export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	withAuthRedirect
)(Dialogs);