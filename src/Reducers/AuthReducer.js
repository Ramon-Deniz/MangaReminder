const authReducer = (state = {
    id: ''
}, action) => {
    switch(action.type){
        case "SET":
            state = {
                ...state,
                id: action.payload
            }
            break;
        default: 
            break;
    }
    return state;
}

export default authReducer;