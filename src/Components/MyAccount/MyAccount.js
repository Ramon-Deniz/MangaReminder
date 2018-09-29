import React from 'react';
import './MyAccount.css';
import Header from '../Header';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import '../Components.css';
import {Link} from 'react-router-dom';
import { Auth } from 'aws-amplify';
import {changeMessage} from '../../Actions/LogInActions';
import {setID} from '../../Actions/AuthActions';

class MyAccount extends React.Component {
  constructor(){
    super();
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount(){
    document.title = "MangaReminder";
    if(this.props.id === ''){
      this.props.history.push('/login');
    }
  }

  handleLogout(e){
    e.preventDefault();
    this.props.changeMessage({
      message: '',
      messageColor: 'orange'
    })
    this.props.setID('')
    Auth.signOut()
      .then(this.props.history.push('/login'))
      .catch(this.props.history.push('/login'));
  }

  render(){
    return(
      <div>
        <Header/>
        <div className="myAccount">
          <text className="titleText">Search for manga, or
          manage your subscriptions.</text>
          <Link className="largeButtonLink" to="/search" style={{marginTop: 100}}>
            Search
          </Link>
          <Link className="largeButtonLink" to="/manage">Manage</Link>
          <button className="largeButtonLink" onClick={this.handleLogout}>
            Log Out
          </button>
        </div>
        
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return{
    id: state.authReducer.id
  };
}

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyAccount));
