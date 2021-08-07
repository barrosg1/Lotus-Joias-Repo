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
} from '../types/types'

const initialState = {
    wholesalers: [],
    wholesaler: {},
    loading: true,
    errors: null,

};

const wholesalerReducer = (state = initialState, action) => {

    const { type, payload, errors } = action;

    switch (type) {
        case GET_ALL_WHOLESALERS_SUCCESS:
            return {
                ...state,
                wholesalers: payload,
                loading: false,

            }
        case GET_ALL_WHOLESALERS_FAIL:
            return {
                ...state,
                wholesalers: null,
                loading: false,
                errors
            }
        case UPDATE_WHOLESALER_SUCCESS:
            return {
                ...state,
                wholesaler: payload,
                loading: false,
            }

        case UPDATE_WHOLESALER_FAIL:
            return {
                ...state,
                wholesaler: null,
                loading: false,
                errors
            }
        case CREATE_WHOLESALER_SUCCESS:
            return {
                ...state,
                wholesaler: payload,
                loading: true,
                tab: 1
            }
        case CREATE_WHOLESALER_FAIL:
            return {
                ...state,
                wholesaler: null,
                loading: false,
                errors
            }

        case GET_WHOLESALER_SUCCESS:
            return {
                ...state,
                wholesaler: payload,
                loading: false,
            }

        case GET_WHOLESALER_FAIL:
            return {
                ...state,
                wholesaler: null,
                loading: false,
                errors
            }

        case DELETE_WHOLESALER_SUCCESS:
            return { ...state, loading: true }

        case DELETE_WHOLESALER_FAIL:
            return {
                ...state,
                loading: false,
                errors
            }

        default:
            return state;
    }
}

export default wholesalerReducer;