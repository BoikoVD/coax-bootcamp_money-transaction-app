import { combineReducers } from 'redux';
import profilePageReducer from './profilePageReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  userReducer,
  profilePageReducer
});

export default rootReducer;