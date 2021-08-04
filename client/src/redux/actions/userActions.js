import axios from "axios";
import { setAlert } from './alertActions';

import {
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
    NEW_USER_SUCCESS,
    NEW_USER_FAIL,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    GET_USERS_SUCCESS,
    GET_USERS_FAIL
} from "../types/types";



// ====== Update current logged in user ======
export const getAllUsers = () => async dispatch => {

    try {

        const res = await axios.get('/api/users');

        dispatch({
            type: GET_USERS_SUCCESS,
            payload: res.data
        });

    } catch (err) {

        const errors = err.response.data.errors;

        if (errors) {

            dispatch(setAlert(errors, 'danger'));
        }

        dispatch({
            type: GET_USERS_FAIL,
            errors: err.response.data
        })

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
};


// ====== Update current logged in user ======
export const updateUser = (data) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'Application/json'
        }
    }

    const body = JSON.stringify(data);

    try {

        const res = await axios.patch('/api/users/edit', body, config);

        dispatch({
            type: USER_UPDATE_SUCCESS,
            payload: res.data
        });

        dispatch(setAlert([{ msg: 'Profile updated' }], 'success'));

        window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (err) {

        const errors = err.response.data.errors;

        if (errors) {

            dispatch(setAlert(errors, 'danger'));
        }

        dispatch({
            type: USER_UPDATE_FAIL,
            errors: err.response.data
        })

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
};

// ====== Update current logged in user ======
export const addNewUser = (data) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'Application/json'
        }
    }

    const body = JSON.stringify(data);

    try {

        const res = await axios.post('/api/users/add', body, config);

        dispatch({
            type: NEW_USER_SUCCESS,
            payload: res.data
        });

        dispatch(setAlert([{ msg: 'User created' }], 'success'));

        window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (err) {

        const errors = err.response.data.errors;

        if (errors) {

            dispatch(setAlert(errors, 'danger'));
        }

        dispatch({
            type: NEW_USER_FAIL,
            errors: err.response.data
        })

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
};

// ====== Delete a user ======
export const deleteUser = (userId) => async dispatch => {

    try {

        await axios.delete(`/api/users/${userId}`);

        dispatch({
            type: DELETE_USER_SUCCESS,
        });

    } catch (err) {


        const errors = err.response.data.errors;

        if (errors) {

            dispatch(setAlert(errors, 'danger'));

        }

        dispatch({
            type: DELETE_USER_FAIL,
            errors: err.response.data

        });

        window.scrollTo({ top: 0, behavior: 'smooth' });

    }
};