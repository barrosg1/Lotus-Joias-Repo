import axios from "axios";
import { setAlert } from './alertActions';


import {
    CREATE_WHOLESALER_SUCCESS,
    CREATE_WHOLESALER_FAIL,
    UPDATE_WHOLESALER_SUCCESS,
    UPDATE_WHOLESALER_FAIL,
    GET_ALL_WHOLESALERS_SUCCESS,
    GET_ALL_WHOLESALERS_FAIL,
    DELETE_WHOLESALER_SUCCESS,
    DELETE_WHOLESALER_FAIL
} from "../types/types";


// =========== Get all wholesalers =============

export const getWholesalers = () => async dispatch => {

    try {

        const res = await axios.get('/api/client');

        dispatch({
            type: GET_ALL_WHOLESALERS_SUCCESS,
            payload: res.data
        });

    } catch (err) {
        dispatch({
            type: GET_ALL_WHOLESALERS_FAIL
        })
    }
};

// =========== Add a new wholesaler =============

export const addWholesaler = (data) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'Application/json'
        }
    }

    const body = JSON.stringify(data);

    try {

        const res = await axios.post('/api/wholesaler', body, config);
        const clientId = res.data._id;

        dispatch({
            type: CREATE_WHOLESALER_SUCCESS,
            payload: res.data
        });

        dispatch(setAlert([{ msg: 'Wholesaler saved' }], 'success', 'Go to client page', `/admin/client-profile/${clientId}`));

        window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (err) {

        const errors = err.response.data.errors;

        if (err.response.data.errors) {

            dispatch(setAlert(errors, 'danger'));
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

        dispatch({
            type: UPDATE_WHOLESALER_SUCCESS,
            payload: res.data
        });

    } catch (err) {
        dispatch({
            type: UPDATE_WHOLESALER_FAIL
        })
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