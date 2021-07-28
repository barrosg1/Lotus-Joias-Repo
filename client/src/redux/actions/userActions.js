import axios from "axios";
import { setAlert } from './alertActions';


import { USER_UPDATE_SUCCESS, USER_UPDATE_FAIL } from "../types/types";


export const updateUser = (data) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'Application/json'
        }
    }

    const body = JSON.stringify(data);

    try {

        const res = await axios.patch('/api/users/edit', body, config);

        dispatch({
            type: USER_UPDATE_SUCCESS,
            payload: res.data
        });

        dispatch(setAlert([{ msg: 'Profile updated' }], 'success'));

        window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (err) {

        const errors = err.response.data.errors;

        if (errors) {

            dispatch(setAlert(errors, 'danger'));
        }

        dispatch({
            type: USER_UPDATE_FAIL,
            errors: err.response.data
        })

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
};