
/*

Reducer for users (not for current authenticated user) 

*/

import {
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
    NEW_USER_SUCCESS,
    NEW_USER_FAIL,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    GET_USERS_SUCCESS,
    GET_USERS_FAIL
} from '../types/types'

const initialState = {
    users: null,
    user: null,
    loading: true,
    errors: null
};

const userReducer = (state = initialState, action) => {

    const { type, payload, errors } = action;

    switch (type) {
        case GET_USERS_SUCCESS:
            return {
                ...state,
                users: payload,
                loading: false
            }
        case GET_USERS_FAIL:
            return {
                ...state,
                users: null,
                loading: false,
                errors
            }
        case USER_UPDATE_SUCCESS:
            return {
                ...state,
                user: payload,
                loading: true
            }
        case USER_UPDATE_FAIL:
            return {
                ...state,
                user: null,
                loading: false,
                errors
            }

        case NEW_USER_SUCCESS:
            return {
                ...state,
                user: payload,
                loading: true
            }
        case NEW_USER_FAIL:
            return {
                ...state,
                user: null,
                loading: false,
                errors
            }

        case DELETE_USER_SUCCESS:
            return {
                ...state,
                loading: true
            }
        case DELETE_USER_FAIL:
            return {
                ...state,
                loading: false,
                errors
            }
        default:
            return state;
    }
}

export default userReducer;