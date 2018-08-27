const user = (state = false, action) => {
    switch (action.type) {
        case 'SET_USER': 
            return {...action.payload}
            break;
        case 'REMOVE_USER': 
            return false
            break;
    
        default: 
            return state
            break;
    }
}


export default user;