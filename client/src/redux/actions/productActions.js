import axios from "axios";
import { setAlert } from './alertActions';


import {

    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_FAIL,
    CREATE_PRODUCT_SUCCESS,
    CREATE_PRODUCT_FAIL,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    GET_PRODUCT_SUCCESS,
    GET_PRODUCT_FAIL,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    IMAGE_UPLOAD_SUCCESS,
    IMAGE_UPLOAD_FAIL
} from "../types/types";



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

    const config = { headers: { "Content-Type": "Application/json" } }

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

        } else {

            dispatch(setAlert([{ msg: 'Error: There was a problem adding a new product' }], 'danger'));
        }

        dispatch({
            type: CREATE_PRODUCT_FAIL,
            errors: err.response.data
        });


        window.scrollTo({ top: 0, behavior: 'smooth' });

    }
};

export const getProduct = (productId) => async dispatch => {

    try {

        const res = await axios.get(`/api/product/${productId}`);


        dispatch({
            type: GET_PRODUCT_SUCCESS,
            payload: res.data
        });


    } catch (err) {

        const errors = err.response.data.errors;

        if (errors) {

            dispatch(setAlert(errors, 'danger'));

        }

        console.log(err)

        dispatch({
            type: GET_PRODUCT_FAIL,
            errors: err.response.data

        });


    }
};

export const editProduct = (data, productId) => async dispatch => {

    try {

        const config = { headers: { "Content-Type": "Application/json" } }

        const res = await axios.patch(`/api/product/${productId}`, data, config);

        dispatch({
            type: UPDATE_PRODUCT_SUCCESS,
            payload: res.data
        });

        dispatch(setAlert([{ msg: 'Product updated' }], 'success', 'View all products', '/admin/products'));

        window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (err) {

        const errors = err.response.data.errors;

        if (errors) {

            dispatch(setAlert(errors, 'danger'));

        }

        dispatch({
            type: UPDATE_PRODUCT_FAIL,
            errors: err.response.data

        });

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
};

export const deleteProduct = (productId) => async dispatch => {

    try {

        await axios.delete(`/api/product/${productId}`);

        dispatch({
            type: DELETE_PRODUCT_SUCCESS,
        });

    } catch (err) {


        const errors = err.response.data.errors;

        if (errors) {

            dispatch(setAlert(errors, 'danger'));

        }

        dispatch({
            type: DELETE_PRODUCT_FAIL,
            errors: err.response.data

        });

        window.scrollTo({ top: 0, behavior: 'smooth' });


    }
};

export const productImageUpload = (formData) => async dispatch => {

    try {

        const config = { headers: { "Content-Type": "multipart/form-data" } }

        await axios.post(`/api/upload`, formData, config);

        dispatch({
            type: IMAGE_UPLOAD_SUCCESS,
        });

    } catch (err) {

        const errors = err.response.data.errors;

        if (errors) {

            dispatch(setAlert(errors, 'danger'));

        }

        dispatch({
            type: IMAGE_UPLOAD_FAIL,
            errors: err.response.data

        });

        window.scrollTo({ top: 0, behavior: 'smooth' });

    }

};