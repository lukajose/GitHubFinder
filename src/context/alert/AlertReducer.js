
import {REMOVE_ALERT,SET_ALERT} from '../types';

const AlertReducer =  (state,action) => {
    switch(action.type) {

        case REMOVE_ALERT:
            return null;
        case SET_ALERT:
            return action.payload;
        default:
            return state;
    }
}

export default AlertReducer;


