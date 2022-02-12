import { combineReducers } from 'redux';
import userReducer from './userReducer';
import profileReducer from './profileReducer';
import contactsReducer from './contactsReducer';
import modalReducer from './modalReducer';
import transactionsReducer from './transactionsReducer';

const rootReducer = combineReducers({
  userReducer,
  profileReducer,
  contactsReducer,
  modalReducer,
  transactionsReducer
});

export default rootReducer;