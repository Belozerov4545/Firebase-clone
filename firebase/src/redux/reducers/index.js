import { combineReducers } from 'redux';
import authReducer from './authReducer.js';
import fileFoldersReducer from './fileFoldersReducer.js';

const rootReducer = combineReducers({ auth: authReducer, filefolders: fileFoldersReducer });
export default rootReducer;
