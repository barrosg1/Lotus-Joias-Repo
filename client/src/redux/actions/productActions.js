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

        const errors = err.response.data.errors;

        if (errors) {

            console.log(`GET_PRODUCTS_FAIL: ${errors}`);

        }

        dispatch({
            type: GET_PRODUCTS_FAIL
        })
    }
};

export const addProduct = (data) => async dispatch => {

    const config = { headers: { "Content-Type": "multipart/form-data" } }

    try {

        const res = await axios.post('/api/product', data, config);

        dispatch({
            type: CREATE_PRODUCT_SUCCESS,
            payload: res.data
        });

        dispatch(setAlert([{ msg: 'Product saved' }], 'success', 'View all products', '/admin/products'));

        window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (err) {

        const errors = err.response.data.errors;

        if (errors) {

            dispatch(setAlert(errors, 'danger'));

        }

        dispatch({
            type: CREATE_PRODUCT_FAIL,
            errors: err.response.data
        });

        window.scrollTo({ top: 0, behavior: 'smooth' });

    }
};