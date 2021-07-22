import axios from "axios";

import {

    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_FAIL,
    CREATE_PRODUCT_SUCCESS,
    CREATE_PRODUCT_FAIL
} from "../types/types";

import { setAlert } from './alertActions';

export const getProducts = () => async dispatch => {

    try {

        const res = await axios.get('/api/product');

        dispatch({
            type: GET_PRODUCTS_SUCCESS,
            payload: res.data
        });

    } catch (err) {
        dispatch({
            type: GET_PRODUCTS_FAIL
        })
    }
};

export const addProduct = (data) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'Application/json'
        }
    }

    const body = JSON.stringify(data);

    try {

        const res = await axios.post('/api/product', body, config);

        dispatch({
            type: CREATE_PRODUCT_SUCCESS,
            payload: res.data
        });

    } catch (err) {

        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: CREATE_PRODUCT_FAIL,
            productErrors: err.response.data
        })
    }
};