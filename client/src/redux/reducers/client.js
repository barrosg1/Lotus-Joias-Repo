import {
    CREATE_CLIENT_SUCCESS,
    CREATE_CLIENT_FAIL,
    GET_CLIENTS_SUCCESS,
    GET_CLIENTS_FAIL,
    GET_CLIENT_SUCCESS,
    GET_CLIENT_FAIL,
    UPDATE_CLIENT_SUCCESS,
    UPDATE_CLIENT_FAIL
} from '../types/types'

const initialState = {
    clients: null,
    client: null,
    loading: true,
    errors: null
};

const clientReducer = (state = initialState, action) => {

    const { type, payload, errors } = action;

    switch (type) {
        case GET_CLIENTS_SUCCESS:
            return {
                ...state,
                clients: payload,
                loading: false
            }
        case GET_CLIENTS_FAIL:
            return {
                ...state,
                clients: null,
                loading: false,
                errors
            }
        case CREATE_CLIENT_SUCCESS:
            return {
                ...state,
                client: payload,
                loading: true
            }
        case CREATE_CLIENT_FAIL:
            return {
                ...state,
                client: null,
                loading: false,
                errors
            }

        case GET_CLIENT_SUCCESS:
            return {
                ...state,
                client: payload,
                loading: false
            }
        case GET_CLIENT_FAIL:
            return {
                ...state,
                client: null,
                loading: false,
                errors
            }

        case UPDATE_CLIENT_SUCCESS:
            return {
                ...state,
                client: payload,
                loading: true
            }
        case UPDATE_CLIENT_FAIL:
            return {
                ...state,
                client: null,
                loading: false,
                errors
            }
        default:
            return state;
    }
}

export default clientReducer;