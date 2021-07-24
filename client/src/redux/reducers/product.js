import {
    CREATE_PRODUCT_SUCCESS,
    CREATE_PRODUCT_FAIL,
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_FAIL
} from '../types/types'

const initialState = {
    products: [],
    product: null,
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
                loading: false,
            }
        case CREATE_PRODUCT_FAIL:
            return {
                ...state,
                product: null,
                loading: false,
                errors
            }

        default:
            return state;
    }
}

export default productReducer;