import axios from "axios";

import {
    GET_USER_PROFILE_SUCCESS,
    GET_USER_PROFILE_FAIL
} from '../types/types'

export const getProfile = () => async dispatch => {

    try {

        const res = await axios.get('/api/auth');

        dispatch({
            type: GET_USER_PROFILE_SUCCESS,
            payload: res.data
        });

    } catch (err) {
        dispatch({
            type: GET_USER_PROFILE_FAIL
        })
    }
};
