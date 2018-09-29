import React, {Component} from 'react';
import './SignUp.css';
import '../Components.css';
import Header from '../Header';
import {isValidPassword} from './PasswordHandler';
import {Auth} from 'aws-amplify';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom'
import { 
  changeMessageColor, changeMessage, changeVerifyMessage, changeVerifyMessageColor 
} from '../../Actions/MessageActions';
import {SignUpPrompt, SignUpButtons, VerifyButtons, VerifyPrompt} from './SignUpComponents';

class SignUp extends Component {
  constructor(){
    super();
    this.state = {
      inputs : {
        email:'',
        password: '',
        confirmPassword: '',
        code: '',
        showVerify: false
      }
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.signUpFail = this.signUpFail.bind(this);
    this.signUpSuccess = this.signUpSuccess.bind(this);
    this.handleVerify = this.handleVerify.bind(this);
    this.verifyFail = this.verifyFail.bind(this);
    this.verifySuccess = this.verifySuccess.bind(this);
    this.changeMessage = this.changeToVerify.bind(this);
    this.changeToVerify = this.changeToVerify.bind(this);
    this.handleResend = this.handleResend.bind(this);
  }

  componentDidMount(){
    document.title = "MangaReminder";
  }

  signUpSuccess(e, data){
    e.persist();
    this.changeToVerify(e);
    this.props.changeVerifyMessageColor('lightgreen');
    this.props.changeVerifyMessage("Almost done! Head over to your email and copy the"
    +" verification code to complete the sign up.");
    this.props.changeMessage('');
  }

  signUpFail(e, err){
    e.persist();
    this.props.changeMessageColor('orange');
    this.props.changeMessage(err.message);
  }

  handleSignUp(e){
    e.preventDefault();
    let passwordResponse = isValidPassword(
      this.state.inputs.password,this.state.inputs.confirmPassword);

    if(passwordResponse !== ''){
      this.props.changeMessageColor('orange');
      this.props.changeMessage(passwordResponse);
      return;
    }

    let username = this.state.inputs.email;
    let password = this.state.inputs.password;
    let email = username;

    Auth.signUp({
      username,
      password,
      attributes: {
          email
      }
      })
      .then(data => this.signUpSuccess(e, data))
      .catch(err => this.signUpFail(e, err));
  }

  changeToVerify(e){
    e.persist();
    this.setState({
      inputs : {
        ...this.state.inputs,
        showVerify: !this.state.inputs.showVerify
      }
    })
  }

  verifySuccess(e, data){
    e.persist();
    this.setState({
      inputs : {
        email:'',
        password: '',
        confirmPassword: '',
        code: '',
        showVerify: false
      }
    })
    this.props.history.push('/login');
  }

  verifyFail(e, err){
    e.persist();
    this.props.changeVerifyMessageColor('orange');
    this.props.changeVerifyMessage(err.message);
  }

  handleResend(e){
    e.preventDefault();
    let username = this.state.inputs.email;
    
    Auth.resendSignUp(username).then(
      this.props.changeVerifyMessage("Verifciation code has been resent"))
      .then(this.props.changeVerifyMessageColor("lightgreen"))
      .catch(err => this.props.changeVerifyMessage(err.message));
  }

  handleVerify(e){
    e.preventDefault();
    let username = this.state.inputs.email;
    let code = this.state.inputs.code;

    if(code === ''){
      this.props.changeVerifyMessageColor("orange");
      this.props.changeVerifyMessage("The code can not be empty.");
      return;
    }

    Auth.confirmSignUp(username, code, {
      // Optional. Force user confirmation irrespective of existing alias. By default set to True.
      forceAliasCreation: true    
  }).then(data => this.verifySuccess(e, data))
    .catch(err => this.verifyFail(e, err));
  }

  handleInputChange(e){
    e.preventDefault();
    this.setState({
      inputs: {
        ...this.state.inputs,
        [e.target.name]: e.target.value
      }
    })
  }

  render(){
    const signup = (
      <SignUpPrompt email={this.state.inputs.email}
            password={this.state.inputs.password}
            confirmPassword={this.state.inputs.confirmPassword}
            handleInputChange={this.handleInputChange}
            message={this.props.message}
            messageColor={this.props.messageColor}
      />
    );

    const verify = (
      <VerifyPrompt handleInputChange={this.handleInputChange}
        code = {this.state.code}
        verifyMessage={this.props.verifyMessage}
        verifyMessageColor={this.props.verifyMessageColor}
        email={this.state.inputs.email}
        handleVerify={this.handleVerify}
        handleResend={this.handleResend}
      />
    );

    const signupButtons = (
      <SignUpButtons handleSignUp={this.handleSignUp}/>
    );

    const verifyButtons = (
      <VerifyButtons handleVerify={this.handleVerify} 
        changeToVerify={this.changeToVerify}
      />
    );

    const askToVerify = (
      <div className="askToVerify">
        <text className="finePrint">Need to paste the verification code? </text>
        <button className="linkButton" onClick={this.changeToVerify}> Click here.</button>
      </div>
    );
    
    return(
      <div>
        <Header/>
        <div className="signUp">
          <text className="titleText">
            Sign up to begin receiving email notifications.
          </text>
          {this.state.inputs.showVerify ? verify: signup}
          {this.state.inputs.showVerify ? verifyButtons: signupButtons}
          {this.state.inputs.showVerify ? null: askToVerify}
        </div>
    </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      message: state.messageReducer.message,
      messageColor: state.messageReducer.messageColor,
      verifyMessage: state.messageReducer.verifyMessage,
      verifyMessageColor: state.messageReducer.verifyMessageColor
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeMessage: (message) => {
      dispatch(changeMessage(message));
    },

    changeMessageColor: (messageColor) => {
      dispatch(changeMessageColor(messageColor));
    },

    changeVerifyMessage: (message) => {
      dispatch(changeVerifyMessage(message));
    },

    changeVerifyMessageColor: (messageColor) => {
      dispatch(changeVerifyMessageColor(messageColor));
    }
  };

};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignUp));



