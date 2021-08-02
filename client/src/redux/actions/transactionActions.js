import axios from "axios";
import { setAlert } from './alertActions';


import {
    CREATE_TRANSACTION_SUCCESS,
    CREATE_TRANSACTION_FAIL,
    GET_ALL_CLIENT_TRANSACTIONS_SUCCESS,
    GET_ALL_CLIENT_TRANSACTIONS_FAIL,
    GET_TRANSACTION_SUCCESS,
    GET_TRANSACTION_FAIL,
    UPDATE_TRANSACTION_SUCCESS,
    UPDATE_TRANSACTION_FAIL,
    DELETE_TRANSACTION_SUCCESS,
    DELETE_TRANSACTION_FAIL

} from "../types/types";


// =========== Get all transactions by client ID =============

export const getTransactions = (clientId) => async dispatch => {

    try {

        const res = await axios.get(`api/client/transaction/client/${clientId}`);

        dispatch({
            type: GET_ALL_CLIENT_TRANSACTIONS_SUCCESS,
            payload: res.data
        });

    } catch (err) {
        dispatch({
            type: GET_ALL_CLIENT_TRANSACTIONS_FAIL
        })
    }
};

// =========== Add new transaction =============

export const addTransaction = (data, clientId) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'Application/json'
        }
    }

    try {

        const res = await axios.post(`/api/client/transaction/${clientId}`, data, config);
        // const clientId = res.data._id;

        dispatch({
            type: CREATE_TRANSACTION_SUCCESS,
            payload: res.data
        });

        // dispatch(setAlert([{ msg: 'Client saved' }], 'success', 'Go to client page', `/admin/client-profile/${clientId}`));

        window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (err) {

        const errors = err.response.data.errors;

        if (err.response.data.errors) {

            dispatch(setAlert(errors, 'danger'));
        }

        dispatch({
            type: CREATE_TRANSACTION_FAIL,
            errors: err.response
        })

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
};


// =========== Get a transaction by ID =============

export const getTransaction = (transactionId) => async dispatch => {

    try {

        const res = await axios.get(`/api/client/transaction/${transactionId}`);

        dispatch({
            type: GET_TRANSACTION_SUCCESS,
            payload: res.data
        });

    } catch (err) {
        dispatch({
            type: GET_TRANSACTION_FAIL
        })
    }
};

// =========== Update a transaction  =============

export const editTransaction = (data, clientId, transactionId) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'Application/json'
        }
    }

    try {

        const res = await axios.patch(`/api/client/transaction/${clientId}/${transactionId}`, data, config);

        dispatch({
            type: UPDATE_TRANSACTION_SUCCESS,
            payload: res.data
        });

    } catch (err) {
        dispatch({
            type: UPDATE_TRANSACTION_FAIL
        })
    }
};

// =========== Delete a transaction by ID =============

export const deleteTransaction = (transactionId) => async dispatch => {

    try {

        await axios.delete(`/api/client/transaction/${transactionId}`);

        dispatch({
            type: DELETE_TRANSACTION_SUCCESS,
        });

    } catch (err) {


        const errors = err.response.data.errors;

        if (errors) {

            dispatch(setAlert(errors, 'danger'));

        }

        dispatch({
            type: DELETE_TRANSACTION_FAIL,
            errors: err.response.data

        });

        window.scrollTo({ top: 0, behavior: 'smooth' });


    }
};