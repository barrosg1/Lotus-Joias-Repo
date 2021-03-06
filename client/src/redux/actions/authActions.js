import axios from "axios";
import setAuthToken from '../../utils/setAuthToken';

import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT
} from '../types/types';

import { setAlert } from './alertActions';


// load user
export const loadUser = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);

    }

    try {

        const res = await axios.get('/api/auth');

        dispatch({
            type: USER_LOADED,
            payload: res.data
        });

        localStorage.setItem('currentUser', JSON.stringify(res.data));

    } catch (err) {

        dispatch({
            type: AUTH_ERROR
        })
    }
};

// register User
export const register = (data) => async dispatch => {

    const config = { headers: { 'Content-Type': `multipart/form-data; boundary=${data._boundary}`, } }


    const body = JSON.stringify(data);

    try {
        const res = await axios.post('/api/users', body, config);

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });

        dispatch(loadUser());

    } catch (err) {

        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: REGISTER_FAIL
        });
    }
}

// login user
export const login = (data) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'Application/json'
        }
    }

    const body = JSON.stringify(data);

    try {
        const res = await axios.post('/api/auth', body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });

        dispatch(loadUser());


    } catch (err) {

        const errors = err.response.data.errors;

        if (errors) {
            // errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));

            dispatch(setAlert(errors, 'danger'));

        }

        console.log(`Login error: ${err}`);

        dispatch({
            type: LOGIN_FAIL
        });
    }
}

// logout 
export const logout = () => dispatch => {
    dispatch({ type: LOGOUT });
}