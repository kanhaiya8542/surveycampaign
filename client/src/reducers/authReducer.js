import {FATCH_USER,} from '../actions/type';


export default function(state = null, action){
   console.log('action',action)
    switch (action.type) {
        case FATCH_USER:
            return action.payload || false   ;
        default:
            return state
            // break;
    }
}    