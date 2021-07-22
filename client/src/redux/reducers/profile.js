import {
    GET_USER_PROFILE_SUCCESS,
    GET_USER_PROFILE_FAIL
} from '../types/types'

const initialState = {
    profile: null,
    loading: true
};

const profileReducer = (state = initialState, action) => {

    const { type, payload } = action;

    switch (type) {
        case GET_USER_PROFILE_SUCCESS:
            return {
                ...state,
                profile: payload,
                loading: false
            }

        case GET_USER_PROFILE_FAIL:
            return {
                ...state,
                profile: null,
                loading: false
            }

        default:
            return state;
    }
}

export default profileReducer;