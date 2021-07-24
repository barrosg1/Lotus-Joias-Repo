import {
    CREATE_CLIENT_SUCCESS,
    CREATE_CLIENT_FAIL,
    GET_CLIENTS_SUCCESS,
    GET_CLIENTS_FAIL
} from '../types/types'

const initialState = {
    clients: null,
    client: null,
    loading: true
};

const clientReducer = (state = initialState, action) => {

    const { type, payload } = action;

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
                loading: false
            }
        case CREATE_CLIENT_SUCCESS:
            return {
                ...state,
                client: payload,
                loading: false
            }
        case CREATE_CLIENT_FAIL:
            return {
                ...state,
                client: null,
                loading: false
            }

        default:
            return state;
    }
}

export default clientReducer;