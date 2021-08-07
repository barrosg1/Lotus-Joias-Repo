import axios from "axios";
import { setAlert } from './alertActions';


import {
    CREATE_WHOLESALER_SUCCESS,
    CREATE_WHOLESALER_FAIL,
    UPDATE_WHOLESALER_SUCCESS,
    UPDATE_WHOLESALER_FAIL,
    GET_ALL_WHOLESALERS_SUCCESS,
    GET_ALL_WHOLESALERS_FAIL,
    GET_WHOLESALER_SUCCESS,
    GET_WHOLESALER_FAIL,
    DELETE_WHOLESALER_SUCCESS,
    DELETE_WHOLESALER_FAIL
} from "../types/types";


// =========== Get all wholesalers =============

export const getWholesalers = () => async dispatch => {

    try {

        const res = await axios.get('/api/wholesaler');

        dispatch({
            type: GET_ALL_WHOLESALERS_SUCCESS,
            payload: res.data
        });

    } catch (err) {

        const errors = err.response.data.errors;

        if (err.response.data.errors) console.log(JSON.stringify(errors));

        dispatch({
            type: GET_ALL_WHOLESALERS_FAIL,
            errors: err.response
        });

    }
};

// =========== Get wholesaler by ID  =============

export const getWholesaler = (wholesalerId) => async dispatch => {

    try {

        const res = await axios.patch(`/api/wholesaler/${wholesalerId}`);

        dispatch({
            type: GET_WHOLESALER_SUCCESS,
            payload: res.data
        });

    } catch (err) {

        const errors = err.response.data.errors;

        if (err.response.data.errors) console.log(JSON.stringify(errors));

        dispatch({
            type: GET_WHOLESALER_FAIL,
            errors: err.response
        });
    }
};

// =========== Add a new wholesaler =============

export const addWholesaler = (data) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'Application/json'
        }
    }

    try {

        const res = await axios.post('/api/wholesaler', data, config);

        dispatch({
            type: CREATE_WHOLESALER_SUCCESS,
            payload: res.data
        });

        dispatch(setAlert([{ msg: 'Wholesaler saved' }], 'success'));

        window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (err) {

        const errors = err.response.data.errors;

        if (err.response.data.errors) {

            dispatch(setAlert(errors, 'danger'));
        } else {

            dispatch(setAlert([{ msg: err }], 'danger'));
        }

        dispatch({
            type: CREATE_WHOLESALER_FAIL,
            errors: err.response
        })

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
};

// =========== Edit wholesaler =============

export const editWholesaler = (data, wholesalerId) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'Application/json'
        }
    }

    try {

        const res = await axios.patch(`/api/wholesaler/${wholesalerId}`, data, config);

        dispatch(setAlert([{ msg: 'Fornecedor foi atualizado' }], 'success'));

        dispatch({
            type: UPDATE_WHOLESALER_SUCCESS,
            payload: res.data
        });

        window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (err) {

        const errors = err.response.data.errors;

        if (err.response.data.errors) {

            dispatch(setAlert(errors, 'danger'));
        } else {

            console.log(JSON.stringify(err.response));
        }

        dispatch({
            type: UPDATE_WHOLESALER_FAIL,
            errors: err.response
        })

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
};

// =========== Delete a wholesaler =============

export const deleteWholesaler = (wholesalerId) => async dispatch => {

    try {

        await axios.delete(`/api/wholesaler/${wholesalerId}`);

        dispatch({
            type: DELETE_WHOLESALER_SUCCESS,
        });

    } catch (err) {

        const errors = err.response.data.errors;

        if (errors) {

            dispatch(setAlert(errors, 'danger'));

        }

        dispatch({
            type: DELETE_WHOLESALER_FAIL,
            errors: err.response.data

        });

        window.scrollTo({ top: 0, behavior: 'smooth' });


    }
};