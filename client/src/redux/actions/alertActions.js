import { SET_ALERT, REMOVE_ALERT } from "../types/types";

import { v4 as uuidv4 } from 'uuid';


export const setAlert = (msgData, alertType, redirectValue = null, redirectPath = null, timeout = 5000) => dispatch => {

    dispatch({
        type: SET_ALERT,
        payload: {
            msgData,
            alertType,
            redirectValue,
            redirectPath
        }
    })

    setTimeout(() => dispatch({ type: REMOVE_ALERT }), timeout);
};