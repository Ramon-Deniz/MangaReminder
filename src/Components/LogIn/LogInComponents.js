import React from 'react';
import {Link} from 'react-router-dom';
import './LogIn.css';
import '../Components.css';

export const LogInPrompt = (props) => {
    return(
        <div className="logInPrompt">
            <input className="inputBox" placeholder="Enter Email" name="email"
                type="text" value={props.inputs.email}
                onChange={props.handleInputChange}/>
            <input className="inputBox" placeholder="Enter Password" 
                name="password" type="password" 
                value={props.inputs.password}
                onChange={props.handleInputChange}/>
        </div>
    );
}

export const LogInButtons = (props) => {
    return(
      <div className="logInButtons">
          <Link to="/" className="buttonLink">Home</Link>
          <button className="button" onClick={props.handleLogIn}>
            Log In
          </button>
      </div>
    );
}

export const RecoveryPrompt = (props) => {
    return(
        <div className="recoveryPromptLink">
            <text className="finePrint">Forgot password?</text>
            <Link to="/recover" className="link"> Click here.</Link>
        </div>
    );
}

export const SignUpPrompt = (props) => {
    return(
        <div className="signUpPrompt_LogIn">
            <text className="finePrint">Don't have an account?</text>
            <Link to="/signup" className="link"> Click here.</Link>
        </div>
    )
}
  