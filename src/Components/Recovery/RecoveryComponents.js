import './Recovery.css';
import React from 'react'
import '../Components.css';
import {Link} from 'react-router-dom';

export const RecoveryPrompt = (props) => {
    return(
        <div className="recoveryPrompt">
            <input placeholder="Enter email" className="inputBox"
                name="email" value={props.inputs.email}
                onChange={props.handleInputChange} type="text"/>
        </div>
    );
}

export const RecoveryPromptFinal = (props) => {
    return(
        <div className="recoveryPrompt">
            <input placeholder="Enter Verification Code" className="inputBox"
                        name="code" value={props.inputs.code}
                        onChange={props.handleInputChange}/>
            <input placeholder="Enter New Password" className="inputBox"
                        name="newPassword" value={props.inputs.newPassword}
                        onChange={props.handleInputChange} type="password"/>
            <input placeholder="Confirm New Password" className="inputBox"
                    name="confirmNewPassword" 
                    value={props.inputs.confirmNewPassword}
                    onChange={props.handleInputChange} type="password"/>
        </div>
    );
}

export const EmailPromptButtons = (props) => {
    return(
        <div className="recoveryButtons">
            <Link to="/" className="buttonLink">Home</Link>
            <button className="button" onClick={props.handleEmail}>
                Next
            </button>
        </div>
    );
}

export const RecoveryPromptFinalButtons = (props) => {
    return(
        <button className="button" onClick={props.handleRecovery}
        style={{alignSelf: 'center', marginTop: 15}}>
            Finish
        </button>
    );
}

export const RecoveryLink = (props) => {
    return (
        <button onClick={props.handleRestart} className="linkButton"
            style={{marginTop: 20}}>
            Restart recovery.
        </button>
    );
}