import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux';
import messageReducer from './Reducers/MessageReducer';
import logInReducer from './Reducers/LogInReducer';
import {combineReducers, createStore} from 'redux';
import recoveryReducer from './Reducers/RecoveryReducer';
import authReducer from './Reducers/AuthReducer';

const store = createStore(combineReducers({
  messageReducer: messageReducer,
  logInReducer: logInReducer,
  recoveryReducer: recoveryReducer,
  authReducer: authReducer
}));

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
   document.getElementById('root'));
registerServiceWorker();
