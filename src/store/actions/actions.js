import * as types from '../types/types';

export const setIsAuthAC = (isAuth) => ({ type: types.SET_IS_AUTH, payload: isAuth });
export const setUserDataAC = (userData) => ({ type: types.SET_USER_DATA, payload: userData });
export const setIsLoadingUserAC = (isLoading) => ({ type: types.SET_IS_LOADING_USER, payload: isLoading });
export const setErrorUserAC = (error) => ({ type: types.SET_ERROR_USER, payload: error });
export const setIsModalVisibleUserAC = (isModalVisible) => ({ type: types.SET_IS_MODAL_VISIBLE_USER, payload: isModalVisible });

export const setProfileDataAC = (profileData, isCurrent) => ({ type: types.SET_PROFILE_DATA, payload: { profileData, isCurrent } });
export const setUpdatedProfileDataAC = (firstName, lastName) => ({ type: types.SET_UPDATED_PROFILE_DATA, payload: { firstName, lastName } });
export const setIsLoadingProfileAC = (isLoading) => ({ type: types.SET_IS_LOADING_PROFILE, payload: isLoading });
export const setErrorProfileAC = (error) => ({ type: types.SET_ERROR_PROFILE, payload: error });
export const setIsModalVisibleProfileAC = (isModalVisible, modalType) => ({ type: types.SET_IS_MODAL_VISIBLE_PROFILE, payload: { isModalVisible, modalType } });
export const setIsModalLoadingProfileAC = (isModalLoading) => ({ type: types.SET_IS_MODAL_LOADING_PROFILE, payload: isModalLoading });
export const setModalMessageProfileAC = (modalMessage) => ({ type: types.SET_MODAL_MESSAGE_PROFILE, payload: modalMessage });

export const addContactAC = (contactId) => ({ type: types.ADD_CONTACT, payload: contactId });
export const setContactsAC = (contacts) => ({ type: types.SET_CONTACTS, payload: contacts });


export const loginAC = (email, password, remember) => ({ type: types.LOGIN, payload: { email, password, remember } });
export const logoutAC = () => ({ type: types.LOGOUT, payload: null });
export const checkAuthAC = () => ({ type: types.CHECK_AUTH, payload: null });
export const registrationAC = (email, firstName, lastName, password) => ({ type: types.REGISTRATION, payload: { email, firstName, lastName, password } });

export const getProfileAC = (id) => ({ type: types.GET_PROFILE, payload: { id } });
export const updateProfileDataAC = (newFirstName, newLastName, profileId) => ({ type: types.UPDATE_PROFILE_DATA, payload: { newFirstName, newLastName, profileId } });
export const resetPasswordAC = (newPassword) => ({ type: types.RESET_PASSWORD, payload: { newPassword } });



export const openModalAC = (type) => ({ type: types.OPEN_MODAL, payload: type });
export const closeModalAC = () => ({ type: types.CLOSE_MODAL, payload: null });
export const isModalLoadingAC = () => ({ type: types.IS_MODAL_LOADING, payload: null });
export const setModalMessageAC = (msg, type) => ({ type: types.SET_MODAL_MESSAGE, payload: { msg, type } });
export const removeModalMessageAC = () => ({ type: types.REMOVE_MODAL_MESSAGE, payload: null });