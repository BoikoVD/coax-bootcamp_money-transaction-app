import * as types from '../types/types';

const defaultState = {
  userContacts: [],
  profiles: [],
  itemsCount: 1,
  activePagination: 1,
  isLoading: false,
  error: null
};

export default function contactsReducer(state = defaultState, action) {
  switch (action.type) {
    case types.IS_LOADING_CONTACTS:
      return {
        ...state, isLoading: !state.isLoading
      }
    case types.IS_LOADING_ONE_PROFILE:
      return {
        ...state, profiles: state.profiles.map((p) => {
          if (p.user === action.payload.id) {
            return { ...p, isLoading: action.payload.isLoading }
          }
          return p;
        })
      }
    case types.SET_ONE_CONTACT:
      return {
        ...state, userContacts: [...state.userContacts, action.payload]
      }
    case types.SET_CONTACTS:
      return {
        ...state, userContacts: action.payload
      }
    case types.SET_CONTACT_PROFILES:
      return {
        ...state, profiles: action.payload.profiles, itemsCount: action.payload.itemsCount
      }
    case types.SET_PAGINATION:
      return {
        ...state, activePagination: action.payload.activePagination
      }
    case types.SET_ITEMS_COUNT_OF_PAGINATION:
      return {
        ...state, itemsCount: action.payload.itemsCount
      }
    default:
      return state;
  }
}