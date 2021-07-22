import { combineReducers } from 'redux';
import authReducer from './auth';
import clientReducer from './client';
import productReducer from './product';
import profileReducer from './profile';
import alertReducer from './alert';


export default combineReducers({
    authReducer,
    clientReducer,
    productReducer,
    profileReducer,
    alertReducer
});