import React from 'react';
import styles from './Dialogs.module.scss';
import DialogItem from "./DialogItem";
import Message from "./Message";
import {Redirect} from "react-router";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../utils/validators/validators";
import {Textarea} from "../common/FormControls/FormControls";

const maxLength5 = maxLengthCreator(5);

const Dialogs = ({dialogsPage, sendMessage, isAuth}) => {

		let dialogElements = dialogsPage.dialogs.map(el => <DialogItem key={el.id} name={el.name} id={el.id}/>);
		let messageElements = dialogsPage.messages.map(el => <Message key={el.id} id={el.id} message={el.message}/>);

		if( !isAuth ) {
			return <Redirect to='/login'/>;
		}
		let addNewMessage = ({newMessageBody}) => {
			sendMessage(newMessageBody);
		}
		return (
			<div className={styles.dialogs}>
				<div className={styles.dialogsItems}>
					{dialogElements}
				</div>
				<div className={styles.messages}>
					<div>{messageElements}</div>
					<AddMessageFormRedux onSubmit={addNewMessage}/>
				</div>

			</div>
		);
};

const AddMessageForm = (props) => {
	return (
		<form onSubmit={props.handleSubmit}>
			<div>
				<Field component={Textarea} name="newMessageBody" placeholder="Enter your message" validate={[required, maxLength5]}/>
				<button>Добавить сообщение</button>
			</div>
		</form>
	)
};

const AddMessageFormRedux = reduxForm({
	form: 'dialogAddMessageForm',
	touchOnChange: true,
	touchOnBlur: true
})(AddMessageForm);


export default Dialogs;