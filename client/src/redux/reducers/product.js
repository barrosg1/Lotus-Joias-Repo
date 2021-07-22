import {
    CREATE_PRODUCT_SUCCESS,
    CREATE_PRODUCT_FAIL,
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_FAIL
} from '../types/types'

const initialState = {
    products: null,
    product: null,
    loading: true,
    productErrors: null
};

const productReducer = (state = initialState, action) => {

    const { type, payload, productErrors } = action;

    switch (type) {
        case GET_PRODUCTS_SUCCESS:
            return {
                ...state,
                products: payload,
                loading: false
            }
        case GET_PRODUCTS_FAIL:
            return {
                ...state,
                products: null,
                loading: false
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
                productErrors
            }

        default:
            return state;
    }
}

export default productReducer;