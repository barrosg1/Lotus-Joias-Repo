import {
    CREATE_TRANSACTION_SUCCESS,
    CREATE_TRANSACTION_FAIL,
    GET_ALL_CLIENT_TRANSACTIONS_SUCCESS,
    GET_ALL_CLIENT_TRANSACTIONS_FAIL,
    GET_TRANSACTION_SUCCESS,
    GET_TRANSACTION_FAIL,
    UPDATE_TRANSACTION_SUCCESS,
    UPDATE_TRANSACTION_FAIL,
    DELETE_TRANSACTION_SUCCESS,
    DELETE_TRANSACTION_FAIL
} from '../types/types'

const initialState = {
    transactions: null,
    transaction: null,
    loading: true,
    errors: null
};

const transactionReducer = (state = initialState, action) => {

    const { type, payload, errors } = action;

    switch (type) {
        case GET_ALL_CLIENT_TRANSACTIONS_SUCCESS:
            return {
                ...state,
                transactions: payload,
                loading: false
            }
        case GET_ALL_CLIENT_TRANSACTIONS_FAIL:
            return {
                ...state,
                transactions: null,
                loading: false,
                errors
            }
        case GET_TRANSACTION_SUCCESS:
            return {
                ...state,
                transaction: payload,
                loading: false
            }
        case GET_TRANSACTION_FAIL:
            return {
                ...state,
                transaction: null,
                loading: false,
                errors
            }
        case CREATE_TRANSACTION_SUCCESS:
            return {
                ...state,
                transaction: payload,
                loading: true
            }
        case CREATE_TRANSACTION_FAIL:
            return {
                ...state,
                transaction: null,
                loading: false,
                errors
            }
        case UPDATE_TRANSACTION_SUCCESS:
            return {
                ...state,
                transaction: payload,
                loading: true
            }
        case UPDATE_TRANSACTION_FAIL:
            return {
                ...state,
                transaction: null,
                loading: false,
                errors
            }
        case DELETE_TRANSACTION_SUCCESS:
            return {
                ...state,
                loading: true
            }
        case DELETE_TRANSACTION_FAIL:
            return {
                ...state,
                loading: false,
                errors
            }

        default:
            return state;
    }
}

export default transactionReducer;