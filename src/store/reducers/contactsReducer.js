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
    case types.SET_CONTACTS:
      return {
        ...state, userContacts: action.payload.contacts
      }
    case types.SET_PAGINATION:
      return {
        ...state, activePagination: action.payload.activePagination
      }
    case types.SET_ITEMS_COUNT_OF_PAGINATION:
      return {
        ...state, itemsCount: action.payload.itemsCount
      }
    case types.GET_CONTACTS:
      return {
        ...state, isLoading: true
      }
    case types.GET_CONTACTS_SUCCESS:
      return {
        ...state, profiles: action.payload.profiles, itemsCount: action.payload.itemsCount, isLoading: false
      }
    case types.GET_CONTACTS_ERROR:
      return {
        ...state, isLoading: false
      }
    case types.GET_ALL_PROFILES:
      return {
        ...state, isLoading: true
      }
    case types.GET_ALL_PROFILES_SUCCESS:
      return {
        ...state, profiles: action.payload.profiles, itemsCount: action.payload.itemsCount, isLoading: false
      }
    case types.GET_ALL_PROFILES_ERROR:
      return {
        ...state, isLoading: false
      }
    case types.ADD_CONTACT:
      return {
        ...state, profiles: state.profiles.map((p) => {
          if (p.user === action.payload.id) {
            return { ...p, isLoading: true }
          }
          return p;
        })
      }
    case types.ADD_CONTACT_SUCCESS:
      return {
        ...state, profiles: state.profiles.map((p) => {
          if (p.user === action.payload.contactId) {
            return { ...p, isLoading: false }
          }
          return p;
        }),
        userContacts: [...state.userContacts, action.payload.contactId]
      }
    case types.ADD_CONTACT_ERROR:
      return {
        ...state, profiles: state.profiles.map((p) => {
          if (p.user === action.payload.id) {
            return { ...p, isLoading: false }
          }
          return p;
        })
      }
    case types.DELETE_CONTACT:
      return {
        ...state, profiles: state.profiles.map((p) => {
          if (p.user === action.payload.id) {
            return { ...p, isLoading: true }
          }
          return p;
        })
      }
    case types.DELETE_CONTACT_SUCCESS:
      return {
        ...state, profiles: state.profiles.map((p) => {
          if (p.user === action.payload.id) {
            return { ...p, isLoading: false }
          }
          return p;
        }),
        userContacts: action.payload.contacts
      }
    case types.DELETE_CONTACT_ERROR:
      return {
        ...state, profiles: state.profiles.map((p) => {
          if (p.user === action.payload.id) {
            return { ...p, isLoading: false }
          }
          return p;
        })
      }
    default:
      return state;
  }
}