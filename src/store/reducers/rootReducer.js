import { combineReducers } from 'redux';
import userReducer from './userReducer';
import profileReducer from './profileReducer';
import contactsReducer from './contactsReducer';

const rootReducer = combineReducers({
  userReducer,
  profileReducer,
  contactsReducer
});

export default rootReducer;