import React from 'react';
import '../Components.css';
import './Recovery.css';
import Header from '../Header';
import {RecoveryLink, RecoveryPrompt, 
    EmailPromptButtons, RecoveryPromptFinal, RecoveryPromptFinalButtons} from './RecoveryComponents';
import {Auth} from 'aws-amplify';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {changeMessage} from '../../Actions/RecoveryActions';
import {isValidPassword} from '../SignUp/PasswordHandler';

class Recovery extends React.Component {
    constructor(){
        super();
        this.state = {
            inputs: {
                email: '',
                code: '',
                newPassword: '',
                confirmNewPassword: ''
            },
            showEmailPrompt: true
        }
        this.handleRestart = this.handleRestart.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handleEmailSuccess = this.handleEmailSuccess.bind(this);
        this.handleEmailFail = this.handleEmailFail.bind(this);
        this.handleRecovery = this.handleRecovery.bind(this);
        this.handleRecoveryFail = this.handleRecoveryFail.bind(this);
        this.handleRecoverySuccess = this.handleRecoverySuccess.bind(this);
    }

    componentDidMount(){
        document.title = "MangaReminder";
      }

    handleInputChange(e){
        e.preventDefault();
        this.setState({
            ...this.state,
            inputs: {
                ...this.state.inputs,
                [e.target.name]: e.target.value
            }
        })
    }

    handleEmailSuccess(e, data){
        e.persist();

        let messagePackage = {
            message: 'Head over to your email and copy the verication code.',
            messageColor: 'lightgreen'
        };

        this.setState({
            ...this.state,
            showEmailPrompt: false
        })
        this.props.changeMessage(messagePackage);
    }

    handleEmailFail(e, err){
        e.persist();

        let messagePackage = {
            message: err.message,
            messageColor: 'orange'
        };
        
        this.props.changeMessage(messagePackage);
    }

    handleEmail(e){
        e.preventDefault();

        let username = this.state.inputs.email;

        Auth.forgotPassword(username)
            .then(data => this.handleEmailSuccess(e, data))
            .catch(err => this.handleEmailFail(e, err));
    }

    handleRecoverySuccess(e, data){
        e.persist();
        this.props.history.push('/login');
    }

    handleRecoveryFail(e, err){
        e.persist();
        let messagePackage = {
            message: err.message,
            messageColor: 'orange'
        }
        this.props.changeMessage(messagePackage);
    }

    handleRecovery(e){
        e.preventDefault();

        let response = isValidPassword(this.state.inputs.newPassword,
             this.state.inputs.confirmNewPassword);

        if(response !== ''){
            let messagePackage = {
                message: response,
                messageColor: 'orange'
            }
            this.props.changeMessage(messagePackage);
            return;
        }
        
        let username = this.state.inputs.email;
        let new_password = this.state.inputs.newPassword;
        let code = this.state.inputs.code;

        Auth.forgotPasswordSubmit(username, code, new_password)
            .then(data => this.handleRecoverySuccess(e, data))
            .catch(err => this.handleRecoveryFail(e, err));
    }

    handleRestart(e){
        window.location.reload();
    }

    render(){
        const recoveryPrompt = (
            <RecoveryPrompt inputs={this.state.inputs}
                handleInputChange={this.handleInputChange}/>
        );

        const recoveryPromptFinal = (
            <RecoveryPromptFinal inputs = {this.state.inputs}
                handleInputChange={this.handleInputChange}/>
        );

        const recoveryPromptButtons = (
            <EmailPromptButtons handleEmail={this.handleEmail}/>
        );

        const recoveryPromptFinalButtons = (
            <RecoveryPromptFinalButtons handleRecovery={this.handleRecovery}/>
        );

        return(
            <div className="recovery">
                <Header/>
                <text className="recoveryTitle">
                    Recovery
                </text>
                {this.state.showEmailPrompt ? 
                    recoveryPrompt: recoveryPromptFinal}
                <text className="message" 
                    style={{color: `${this.props.messageColor}`}}>
                    {this.props.message}
                </text>
                {this.state.showEmailPrompt ? 
                    recoveryPromptButtons: recoveryPromptFinalButtons}
                <RecoveryLink handleRestart={this.handleRestart}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        message: state.recoveryReducer.messagePackage.message,
        messageColor: state.recoveryReducer.messagePackage.messageColor
    };
};
  
const mapDispatchToProps = (dispatch) => {
    return {
        changeMessage: (messagePackage) => {
            dispatch(changeMessage(messagePackage));
        }
  
    };
};
  
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Recovery));
