import axios from "axios";
import { setAlert } from './alertActions';


import { GET_CLIENTS_SUCCESS, GET_CLIENTS_FAIL, CREATE_CLIENT_SUCCESS, CREATE_CLIENT_FAIL } from "../types/types";


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

export const addClient = (data) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'Application/json'
        }
    }

    const body = JSON.stringify(data);

    try {

        const res = await axios.post('/api/client', body, config);

        dispatch({
            type: CREATE_CLIENT_SUCCESS,
            payload: res.data
        });

        dispatch(setAlert([{ msg: 'Client saved' }], 'success', 'View all clients', '/admin/clients'));

        window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (err) {

        const errors = err.response.data.errors;

        if (errors) {

            dispatch(setAlert(errors, 'danger'));
        }

        dispatch({
            type: CREATE_CLIENT_FAIL,
            errors: err.response.data
        })

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
};