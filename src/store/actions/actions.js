import * as types from '../types/types';

export const setIsAuthAC = (isAuth) => ({ type: types.SET_IS_AUTH, payload: isAuth });
export const setUserDataAC = (userData) => ({ type: types.SET_USER_DATA, payload: userData });
export const setIsLoadingUserAC = (isLoading) => ({ type: types.SET_IS_LOADING_USER, payload: isLoading });
export const setErrorUserAC = (error) => ({ type: types.SET_ERROR_USER, payload: error });
export const setIsModalVisibleUserAC = (isModalVisible) => ({ type: types.SET_IS_MODAL_VISIBLE_USER, payload: isModalVisible });

export const setProfileDataAC = (profileData, isCurrent) => ({ type: types.SET_PROFILE_DATA, payload: { profileData, isCurrent } });
export const setUpdatedProfileDataAC = (firstName, lastName) => ({ type: types.SET_UPDATED_PROFILE_DATA, payload: { firstName, lastName } });

export const addContactAC = (contactId) => ({ type: types.ADD_CONTACT, payload: contactId });
export const setContactsAC = (contacts) => ({ type: types.SET_CONTACTS, payload: contacts });


export const loginAC = (email, password, remember) => ({ type: types.LOGIN, payload: { email, password, remember } });
export const logoutAC = () => ({ type: types.LOGOUT, payload: null });
export const checkAuthAC = () => ({ type: types.CHECK_AUTH, payload: null });
export const registrationAC = (email, firstName, lastName, password) => ({ type: types.REGISTRATION, payload: { email, firstName, lastName, password } });