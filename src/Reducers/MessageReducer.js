const messageReducer = (state = {
    message: '',
    messageColor: 'lightgreen',
    verifyMessage: '',
    verifyMessageColor: 'lightgreen'
}, action) => {
  switch(action.type) {
    case "CHANGE":
      state = {
        ...state,
        message: action.payload
      }
      break;
    case "CHANGECOLOR":
      state = {
        ...state,
        messageColor: action.payload
      }
      break;
    case "CHANGEVERIFY":
      state = {
        ...state,
        verifyMessage: action.payload
      }
      break;
    case "CHANGEVERIFYCOLOR":
      state = {
        ...state,
        verifyMessageColor: action.payload
      }
      break;
    default:
      break;
  }
  return state;
};

export default messageReducer;
