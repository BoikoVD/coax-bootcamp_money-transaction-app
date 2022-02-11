import * as types from '../types/types';

const defaultState = {
  userContacts: [],
  isLoading: false,
  error: null
};

export default function contactsReducer(state = defaultState, action) {
  switch (action.type) {
    case types.ADD_CONTACT:
      return {
        ...state, userContacts: [...state.userContacts, action.payload]
      }
    case types.SET_CONTACTS:
      return {
        ...state, userContacts: action.payload
      }
    default:
      return state;
  }
}