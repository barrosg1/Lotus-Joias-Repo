import { combineReducers } from 'redux';
import authReducer from './auth';
import clientReducer from './client';
import productReducer from './product';

export default combineReducers({
    authReducer,
    clientReducer,
    productReducer
});