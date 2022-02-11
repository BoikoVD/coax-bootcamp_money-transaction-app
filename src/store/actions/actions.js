import * as types from '../types/types';

export const setIsAuthAC = (isAuth) => ({ type: types.SET_IS_AUTH, payload: isAuth });
export const setUserDataAC = (userData) => ({ type: types.SET_USER_DATA, payload: userData });

export const setProfileDataAC = (profileData, isCurrent) => ({ type: types.SET_PROFILE_DATA, payload: { profileData, isCurrent } });
export const setUpdatedProfileDataAC = (firstName, lastName) => ({ type: types.SET_UPDATED_PROFILE_DATA, payload: { firstName, lastName } });

export const addContactAC = (contactId) => ({ type: types.ADD_CONTACT, payload: contactId });
export const setContactsAC = (contacts) => ({ type: types.SET_CONTACTS, payload: contacts });