import axios from "axios";
import { setAlert } from './alertActions';


import {
    GET_CLIENTS_SUCCESS,
    GET_CLIENTS_FAIL,
    CREATE_CLIENT_SUCCESS,
    CREATE_CLIENT_FAIL,
    GET_CLIENT_SUCCESS,
    GET_CLIENT_FAIL,
    UPDATE_CLIENT_SUCCESS,
    UPDATE_CLIENT_FAIL
} from "../types/types";


// =========== Get all clients =============

export const getClients = () => async dispatch => {

    try {

        const res = await axios.get('/api/client');

        dispatch({
            type: GET_CLIENTS_SUCCESS,
            payload: res.data
        });

    } catch (err) {
        dispatch({
            type: GET_CLIENTS_FAIL
        })
    }
};

// =========== Add new clients =============

export const addClient = (data) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'Application/json'
        }
    }

    const body = JSON.stringify(data);

    try {

        const res = await axios.post('/api/client', body, config);
        const clientId = res.data._id;

        dispatch({
            type: CREATE_CLIENT_SUCCESS,
            payload: res.data
        });

        dispatch(setAlert([{ msg: 'Client saved' }], 'success', 'Go to client page', `/admin/client-profile/${clientId}`));

        window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (err) {

        const errors = err.response.data.errors;

        if (err.response.data.errors) {

            dispatch(setAlert(errors, 'danger'));
        }

        dispatch({
            type: CREATE_CLIENT_FAIL,
            errors: err.response
        })

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
};


// =========== Get a client by ID =============

export const getClient = (clientId) => async dispatch => {

    try {

        const res = await axios.get(`/api/client/${clientId}`);

        dispatch({
            type: GET_CLIENT_SUCCESS,
            payload: res.data
        });

    } catch (err) {
        dispatch({
            type: GET_CLIENT_FAIL
        })
    }
};

export const editClient = (data, clientId) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'Application/json'
        }
    }

    try {

        const res = await axios.patch(`/api/client/${clientId}`, data, config);

        dispatch({
            type: UPDATE_CLIENT_SUCCESS,
            payload: res.data
        });

    } catch (err) {
        dispatch({
            type: UPDATE_CLIENT_FAIL
        })
    }
};