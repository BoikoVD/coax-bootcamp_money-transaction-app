import { combineReducers } from 'redux';
import userReducer from './userReducer';
import profileReducer from './profileReducer';
import contactsReducer from './contactsReducer';
import modalReducer from './modalReducer';

const rootReducer = combineReducers({
  userReducer,
  profileReducer,
  contactsReducer,
  modalReducer
});

export default rootReducer;