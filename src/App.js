import React from 'react';
import './App.css';
import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';
import SignUp from './Components/SignUp/SignUp';
import LogIn from './Components/LogIn/LogIn';
import Home from './Components/Home/Home';
import MyAccount from './Components/MyAccount/MyAccount';
import Recovery from './Components/Recovery/Recovery';
import Search from './Components/Search/Search';
import Manage from './Components/Manage/Manage';
import {BrowserRouter, Route} from 'react-router-dom';

Amplify.configure(aws_exports);

export default class App extends React.Component{
  render(){

    return(
      <BrowserRouter>
        <div>
          {this.props.message}
          <Route path='/'exact component={Home}/>
          <Route path='/signup' component={SignUp}/>
          <Route path='/login' component={LogIn}/>
          <Route path='/myaccount' component={MyAccount}/>
          <Route path='/recover' component={Recovery}/>
          <Route path='/search' component={Search}/>
          <Route path='/manage' component={Manage}/>
        </div>
      </BrowserRouter>
    );
  }
}
