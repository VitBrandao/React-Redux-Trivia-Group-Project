import { combineReducers } from 'redux';
import reducer from './reducer';
import token from './token';
import player from './player';

const rootReducer = combineReducers({ reducer, token, player });

export default rootReducer;
