import React from 'react';
import './Home.css';
import '../Components.css';
import Header from '../Header';
import {Link} from 'react-router-dom';

export default class Home extends React.Component {
  componentDidMount(){
    document.title = "MangaReminder";
  }

  render(){
    return(
      <div>
        <Header/>
        <div className="home">
            <text className="titleText">
              The easiest way to receive email reminders on your favorite manga.
            </text>
            <PromptAuth/>);
        </div>
      </div>
    );
  }
}

const HomeList = (props) => {
    return(
      <div className="homeList">
        
      </div>
    );
}

const PromptAuth  = (props) => {
      return(
        <div className="promptAuth">
          <Link to="/login" className="buttonLink">Log In</Link>
          <Link to="/signup" className="buttonLink">Sign Up</Link>
        </div>
      );
}
