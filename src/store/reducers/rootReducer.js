import { combineReducers } from 'redux';
import userReducer from './userReducer';
import profileReducer from './profileReducer';

const rootReducer = combineReducers({
  userReducer,
  profileReducer
});

export default rootReducer;