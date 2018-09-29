import React from 'react';
import {Link} from 'react-router-dom';
import './SignUp.css';

export const SignUpPrompt = (props) => {
    return(
      <div className="signUpPrompt">
        <input placeholder="Enter Email" className="inputBox" type="text"
          name ="email" value={props.email}
          onChange={props.handleInputChange}/>

        <input placeholder="Enter Password" className = "inputBox" type="password"
          name ="password" value={props.password}
          onChange={props.handleInputChange}/>

        <input placeholder="Confirm Password" className = "inputBox" type="password"
          name ="confirmPassword" value={props.confirmPassword}
          onChange={props.handleInputChange}/>

        <text className="message" style = {{color: `${props.messageColor}`}}>
          {props.message}
        </text>
      </div>
    );
}

export const VerifyPrompt = (props) => {

  return(
    <div className="verifyPrompt">
      <input placeholder="Enter Email" className="inputBox" type="text"
          name ="email" value={props.email}
          onChange={props.handleInputChange}/>
      <input placeholder="Verification Code Here" 
        className="inputBox" type="text"
        name="code" value={props.code} onChange={props.handleInputChange}
      />

      <text className="message" style = {{color: `${props.verifyMessageColor}`}}>
          {props.verifyMessage}
      </text>
      
      <ResendCode handleVerify={props.handleVerify} 
        handleResend={props.handleResend}
      />
    </div>
  );
}

export const SignUpButtons = (props) => {
    return(
      <div className="signUpButtons">
        <Link to="/" className="buttonLink">Home</Link>
        <button onClick={props.handleSignUp}
          className="button">
          Sign Up
        </button>
      </div>
    );
}

export const VerifyButtons = (props) => {
  return(
    <div className="verifyButtons">
      <button onClick={props.changeToVerify} className="button">
        Back
      </button>
      <button onClick={props.handleVerify}
        className="button">
        Verify
      </button>
    </div>
  );
}

const ResendCode = (props) => {
  return(
    <div className="resendCode">
      <text className="finePrint">Having trouble? Resend code </text>
      <button className="linkButton" onClick={props.handleResend}>here.</button>
    </div>
  );
}