import { SET_ALERT, REMOVE_ALERT } from "../types/types";


export const setAlert = (msgData, alertType, redirectValue = null, redirectPath = null) => dispatch => {

    dispatch({
        type: SET_ALERT,
        payload: {
            msgData,
            alertType,
            redirectValue,
            redirectPath
        }
    })

    // setTimeout(() => dispatch({ type: REMOVE_ALERT }), timeout);
};

export const removeAlert = () => dispatch => {

    dispatch({ type: REMOVE_ALERT })

};