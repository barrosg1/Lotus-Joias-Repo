import {
    CREATE_PRODUCT_SUCCESS,
    CREATE_PRODUCT_FAIL,
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_FAIL,
    GET_PRODUCT_SUCCESS,
    GET_PRODUCT_FAIL,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    IMAGE_UPLOAD_SUCCESS,
    IMAGE_UPLOAD_FAIL
} from '../types/types'

const initialState = {
    products: [],
    product: {},
    loading: true,
    errors: null

};

const productReducer = (state = initialState, action) => {

    const { type, payload, errors } = action;

    switch (type) {
        case GET_PRODUCTS_SUCCESS:
            return {
                ...state,
                products: payload,
                loading: false,

            }
        case GET_PRODUCTS_FAIL:
            return {
                ...state,
                products: null,
                loading: false,
                errors
            }
        case CREATE_PRODUCT_SUCCESS:
            return {
                ...state,
                product: payload,
                loading: true,
            }
        case CREATE_PRODUCT_FAIL:
            return {
                ...state,
                product: null,
                loading: false,
                errors
            }

        case GET_PRODUCT_SUCCESS:
            return {
                ...state,
                product: payload,
                loading: false,
            }

        case GET_PRODUCT_FAIL:
            return {
                ...state,
                product: null,
                loading: false,
                errors
            }

        case UPDATE_PRODUCT_SUCCESS:
            return {
                ...state,
                product: payload,
                loading: true,
            }

        case UPDATE_PRODUCT_FAIL:
            return {
                ...state,
                product: null,
                loading: false,
                errors
            }

        case DELETE_PRODUCT_SUCCESS:
            return { ...state, loading: true }

        case DELETE_PRODUCT_FAIL:
            return {
                ...state,
                loading: false,
                errors
            }

        case IMAGE_UPLOAD_SUCCESS:
            return { ...state, loading: false }

        case IMAGE_UPLOAD_FAIL:
            return {
                ...state,
                loading: false,
                errors
            }

        default:
            return state;
    }
}

export default productReducer;