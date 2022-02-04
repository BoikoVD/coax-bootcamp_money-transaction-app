import * as types from '../types/types';

const defaultState = {
  currentProfile: {
    id: null,
    email: null,
    firstName: null,
    lastName: null
  },
  userProfiles: [],
  isLoading: false,
  error: ''
};

export default function userReducer(state = defaultState, action) {
  switch (action.type) {
    case types.SET_USER:
      return {
        ...state, tasks: action.payload
      }
    default:
      return state;
  }
}