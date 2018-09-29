const logInReducer  = (state = {
    messagePackage: {
        message: '',
        messageColor: ''
    }
}, action) => {
    switch(action.type) {
        case "CHANGEMESSAGE":
            state = {
                ...state,
                messagePackage: {
                    ...state.messagePackage,
                    message: action.payload.message,
                    messageColor: action.payload.messageColor
                }
            }
            break;
        default: 
            break;
    }
    return state;
};

export default logInReducer;