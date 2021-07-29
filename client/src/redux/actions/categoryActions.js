import axios from "axios";
import { setAlert } from './alertActions';


import {

    GET_CATEGORY_SUCCESS,
    GET_CATEGORY_FAIL,
    CREATE_CATEGORY_SUCCESS,
    CREATE_CATEGORY_FAIL,
    GET_PRODUCT_CATEGORY_SUCCESS,
    GET_PRODUCT_CATEGORY_FAIL,
    CREATE_PRODUCT_CATEGORY_SUCCESS,
    CREATE_PRODUCT_CATEGORY_FAIL,
    DELETE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_FAIL,
    DELETE_PRODUCT_CATEGORY_SUCCESS,
    DELETE_PRODUCT_CATEGORY_FAIL
} from "../types/types";



// ============ Get Role Categories ===============


export const getRoleCategories = () => async dispatch => {

    try {

        const res = await axios.get('/api/category');

        dispatch({
            type: GET_CATEGORY_SUCCESS,
            payload: res.data
        });


    } catch (err) {

        const errors = err.response.data.errors;

        if (errors) {

            console.log(`GET_PRODUCTS_FAIL: ${errors}`);

        }

        dispatch({
            type: GET_CATEGORY_FAIL
        })
    }
};


// ============ Get Product Categories ===============


export const getProductCategories = () => async dispatch => {

    try {

        const res = await axios.get(`/api/category/product`);


        dispatch({
            type: GET_PRODUCT_CATEGORY_SUCCESS,
            payload: res.data
        });


    } catch (err) {

        const errors = err.response.data.errors;

        if (errors) {

            dispatch(setAlert(errors, 'danger'));

        }

        console.log(err)

        dispatch({
            type: GET_PRODUCT_CATEGORY_FAIL,
            errors: err.response.data

        });


    }
};

// ============ Add Role Category ===============


export const addRoleCategory = (data) => async dispatch => {


    const config = { headers: { "Content-Type": "application/json" } }

    try {

        const res = await axios.post('/api/category', data, config);

        dispatch({
            type: CREATE_CATEGORY_SUCCESS,
            payload: res.data
        });

        dispatch(setAlert([{ msg: 'Category saved' }], 'success'));

        window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (err) {

        const errors = err.response.data.errors;

        if (errors) {

            dispatch(setAlert(errors, 'danger'));

        } else {

            dispatch(setAlert([{ msg: 'Error: There was a problem adding a new product category' }], 'danger'));
        }

        dispatch({
            type: CREATE_CATEGORY_FAIL,
            errors: err.response.data
        });


        window.scrollTo({ top: 0, behavior: 'smooth' });

    }
};


// ============ Add a New Product Category ===============

export const addProductCategory = (data) => async dispatch => {

    try {

        const config = { headers: { "Content-Type": "application/json" } }

        const res = await axios.post(`/api/category/product`, data, config);

        dispatch({
            type: CREATE_PRODUCT_CATEGORY_SUCCESS,
            payload: res.data
        });

        dispatch(setAlert([{ msg: 'Category created' }], 'success'));

        window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (err) {

        const errors = err.response.data.errors;

        if (errors) {

            dispatch(setAlert(errors, 'danger'));

        }

        dispatch({
            type: CREATE_PRODUCT_CATEGORY_FAIL,
            errors: err.response.data

        });

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
};

// ============ Delete Role Category ===============

export const deleteRoleCategory = (productId) => async dispatch => {

    try {

        await axios.delete(`/api/category/${productId}`);

        dispatch({ type: DELETE_CATEGORY_SUCCESS });

    } catch (err) {

        const errors = err.response.data.errors;

        if (errors) {

            dispatch(setAlert(errors, 'danger'));

        }

        dispatch({
            type: DELETE_CATEGORY_FAIL,
            errors: err.response.data

        });

        window.scrollTo({ top: 0, behavior: 'smooth' });

    }

};

// ============ Delete Product Category ===============

export const deleteProductCategory = (productId) => async dispatch => {

    try {

        await axios.delete(`/api/category/product/${productId}`);

        dispatch({ type: DELETE_PRODUCT_CATEGORY_SUCCESS });

    } catch (err) {


        const errors = err.response.data.errors;

        if (errors) {

            dispatch(setAlert(errors, 'danger'));

        }

        dispatch({
            type: DELETE_PRODUCT_CATEGORY_FAIL,
            errors: err.response.data

        });

        window.scrollTo({ top: 0, behavior: 'smooth' });

    }

};