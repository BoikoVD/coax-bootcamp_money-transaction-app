import * as types from '../types/types';

const defaultState = {
  profileData: {
    id: null,
    email: null,
    firstName: null,
    lastName: null,
    user: null,
    created_at: new Date(),
    isLogin: false
  },
  isCurrent: true,
  isLoading: false,
  error: null
};

export default function profileReducer(state = defaultState, action) {
  switch (action.type) {
    case types.GET_PROFILE:
      return {
        ...state, isLoading: true
      }
    case types.GET_PROFILE_SUCCESS:
      return {
        ...state, profileData: action.payload.profileData, isCurrent: action.payload.isCurrent
      }
    case types.GET_PROFILE_ERROR:
      return {
        ...state, error: action.payload.error, isLoading: false
      }
    case types.EDIT_PROFILE_DATA_SUCCESS:
      return {
        ...state, profileData: {
          ...state.profileData,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName
        }
      }
    case types.EDIT_PROFILE_DATA_ERROR:
      return {
        ...state, error: action.payload.error
      }
    case types.ADD_THIS_USER_TO_CONTACTS:
      return {
        ...state, profileData: { ...state.profileData, isLoading: !state.profileData.isLoading }
      }
    case types.ADD_THIS_USER_TO_CONTACTS_SUCCESS:
      return {
        ...state, profileData: { ...state.profileData, isLoading: !state.profileData.isLoading }
      }
    case types.ADD_THIS_USER_TO_CONTACTS_ERROR:
      return {
        ...state, profileData: { ...state.profileData, isLoading: !state.profileData.isLoading }
      }
    case types.DELETE_THIS_USER_FROM_CONTACTS:
      return {
        ...state, profileData: { ...state.profileData, isLoading: !state.profileData.isLoading }
      }
    case types.DELETE_THIS_USER_FROM_CONTACTS_SUCCESS:
      return {
        ...state, profileData: { ...state.profileData, isLoading: !state.profileData.isLoading }
      }
    case types.DELETE_THIS_USER_FROM_CONTACTS_ERROR:
      return {
        ...state, profileData: { ...state.profileData, isLoading: !state.profileData.isLoading }
      }
    default:
      return state;
  }
}