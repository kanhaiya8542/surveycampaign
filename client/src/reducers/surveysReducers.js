import {FATCH_SURVEYS} from '../actions/type';


export default function(state = [], action){
     switch (action.type) {
         case FATCH_SURVEYS:
             return action.payload;
         default:
             return state
             // break;
     }
 }    