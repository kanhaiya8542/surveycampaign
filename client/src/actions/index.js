import axios from 'axios';
import { FATCH_SURVEYS, FATCH_USER } from './type';

export const fetchUser = () => async (dispatch) => {
    const res = await axios.get('/api/current_user')
    dispatch({ type: FATCH_USER, payload: res.data })
}

export const handleToken = token => async dispatch => {
    const res = await axios.post('/api/stripe', token);
    dispatch({ type: FATCH_USER, payload: res.data });
}


export const submitSurvey = (values, history) => async dispatch => {
    const res = await axios.post('/api/surveys', values);
    history.push('/surveys')
    dispatch({ type: FATCH_USER, payload: res.data });
}

export const fetchSurvey = () => async dispatch => {
    const res = await axios.get ('/api/surveys',);
    dispatch({ type: FATCH_SURVEYS, payload: res.data });
}