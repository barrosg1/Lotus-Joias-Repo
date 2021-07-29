import {
    CREATE_CATEGORY_SUCCESS,
    CREATE_CATEGORY_FAIL,
    CREATE_PRODUCT_CATEGORY_SUCCESS,
    CREATE_PRODUCT_CATEGORY_FAIL,
    GET_CATEGORY_SUCCESS,
    GET_CATEGORY_FAIL,
    GET_PRODUCT_CATEGORY_SUCCESS,
    GET_PRODUCT_CATEGORY_FAIL,
    DELETE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_FAIL,
    DELETE_PRODUCT_CATEGORY_SUCCESS,
    DELETE_PRODUCT_CATEGORY_FAIL
} from '../types/types'

const initialState = {
    categories: [],
    productCategories: [],
    category: {},
    productCategory: {},
    loading: true,
    productLoading: true,
    errors: null

};

const categoryReducer = (state = initialState, action) => {

    const { type, payload, errors } = action;

    switch (type) {
        case CREATE_CATEGORY_SUCCESS:
            return {
                ...state,
                category: payload,
                loading: true,
            }
        case CREATE_CATEGORY_FAIL:
            return {
                ...state,
                category: null,
                loading: false,
                errors
            }
        case CREATE_PRODUCT_CATEGORY_SUCCESS:
            return {
                ...state,
                productCategory: payload,
                productLoading: true,

            }
        case CREATE_PRODUCT_CATEGORY_FAIL:
            return {
                ...state,
                errors
            }

        case GET_CATEGORY_SUCCESS:
            return {
                ...state,
                categories: payload,
                loading: false,

            }
        case GET_CATEGORY_FAIL:
            return {
                ...state,
                loading: false,
                errors
            }

        case GET_PRODUCT_CATEGORY_SUCCESS:
            return {
                ...state,
                productCategories: payload,
                productLoading: false,

            }
        case GET_PRODUCT_CATEGORY_FAIL:
            return {
                ...state,
                productCategories: null,
                productLoading: false,
                errors
            }

        case DELETE_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: true,

            }
        case DELETE_CATEGORY_FAIL:
            return {
                ...state,
                loading: false,
                errors
            }

        case DELETE_PRODUCT_CATEGORY_SUCCESS:
            return {
                ...state,
                productLoading: true,

            }
        case DELETE_PRODUCT_CATEGORY_FAIL:
            return {
                ...state,
                loading: false,
                errors
            }

        default:
            return state;
    }
}

export default categoryReducer;