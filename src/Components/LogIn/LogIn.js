import React from 'react';
import './LogIn.css';
import '../Components.css';
import Header from '../Header';
import {LogInButtons, LogInPrompt, RecoveryPrompt, SignUpPrompt} from './LogInComponents';
import { Auth } from 'aws-amplify';
import {changeMessage} from '../../Actions/LogInActions';
import {setID} from '../../Actions/AuthActions';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import '../Components.css';


class LogIn extends React.Component {
  constructor(){
    super();
    this.state = {
      inputs: {
        email: '',
        password: ''
      }
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleLogIn = this.handleLogIn.bind(this);
    this.handleLogInFail = this.handleLogInFail.bind(this);
  }

  componentDidMount(){
    document.title = "MangaReminder";
  }

  handleInputChange(e){
    e.preventDefault();
    this.setState({
      ...this.state,
      inputs : {
        ...this.state.inputs,
        [e.target.name]: e.target.value
      }
    })
  }

  handleLogInSuccess(e, data){
    e.persist();
    this.props.setID(data.signInUserSession.idToken.jwtToken);
    this.props.history.push('/myaccount');
  }

  handleLogInFail(e, err){
    e.persist();
    let messagePackage = {
      message: err.message,
      messageColor: 'orange'
    };
    this.props.changeMessage(messagePackage);
  }

  handleLogIn(e){
    e.preventDefault();
    
    let username = this.state.inputs.email;
    let password = this.state.inputs.password;

    Auth.signIn(username, password)
    .then(data => this.handleLogInSuccess(e, data))
    .catch(err => this.handleLogInFail(e, err));

  }

  render(){
    return(
      <div>
        <Header/>
        <div className="logIn">
          <text className="titleText">
            Log in to manage your subscriptions.
          </text>
          <LogInPrompt handleInputChange={this.handleInputChange}
            inputs={this.state.inputs}/>
          <text className="message" 
            style={{color: `${this.props.messageColor}`}}>
            {this.props.message}
          </text>
          <LogInButtons handleLogIn={this.handleLogIn}/>
          <RecoveryPrompt/>
          <SignUpPrompt/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return{
    message: state.logInReducer.messagePackage.message,
    messageColor: state.logInReducer.messagePackage.messageColor
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeMessage: (messagePackage) => {
      dispatch(changeMessage(messagePackage));
    },
    setID: (id) => {
      dispatch(setID(id));
    }

  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LogIn));
