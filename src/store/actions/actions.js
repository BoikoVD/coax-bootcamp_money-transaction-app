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
export const isLoadingThisProfileAC = () => ({ type: types.IS_LOADING_THIS_PROFILE, payload: null });

export const setOneContactAC = (contactId) => ({ type: types.SET_ONE_CONTACT, payload: contactId });
export const setContactsAC = (contacts) => ({ type: types.SET_CONTACTS, payload: contacts });
export const isLoadingContactsAC = () => ({ type: types.IS_LOADING_CONTACTS, payload: null });
export const setContactProfilesAC = (profiles, itemsCount, activePagination) => ({ type: types.SET_CONTACT_PROFILES, payload: { profiles, itemsCount, activePagination } });
export const setPaginationAC = (activePagination) => ({ type: types.SET_PAGINATION, payload: { activePagination } });
export const setItemsCountOfPaginationAC = (itemsCount) => ({ type: types.SET_ITEMS_COUNT_OF_PAGINATION, payload: { itemsCount } });
export const isLoadingOneProfileAC = (id, isLoading) => ({ type: types.IS_LOADING_ONE_PROFILE, payload: { id, isLoading } });

export const isLoadingTransactionsAC = () => ({ type: types.IS_LOADING_TRANSACTIONS, payload: null });
export const transactionSuccessAC = (newBalance) => ({ type: types.TRANSACTION_SUCCESS, payload: { newBalance } });
export const setTransactionListAC = (list, newBalance) => ({ type: types.SET_TRANSACTION_LIST, payload: { list, newBalance } });
export const setErrorTransactionAC = (error) => ({ type: types.SET_ERROR_TRANSACTION, payload: error });

//saga

export const getProfileAC = (id) => ({ type: types.GET_PROFILE, payload: { id } });
export const updateProfileDataAC = (newFirstName, newLastName, profileId) => ({ type: types.UPDATE_PROFILE_DATA, payload: { newFirstName, newLastName, profileId } });
export const resetPasswordAC = (newPassword) => ({ type: types.RESET_PASSWORD, payload: { newPassword } });
export const addContactFromProfileAC = (id) => ({ type: types.ADD_CONTACT_FROM_PROFILE, payload: { id } });
export const deleteContactFromProfileAC = (id) => ({ type: types.DELETE_CONTACT_FROM_PROFILE, payload: { id } });

export const getContactsAC = (from, to, page) => ({ type: types.GET_CONTACTS, payload: { from, to, page } });
export const getAllProfilesAC = (from, to, page) => ({ type: types.GET_ALL_PROFILES, payload: { from, to, page } });
export const addContactAC = (id) => ({ type: types.ADD_CONTACT, payload: { id } });
export const deleteContactAC = (id) => ({ type: types.DELETE_CONTACT, payload: { id } });

export const createTransactionAC = (from, to, amount) => ({ type: types.CREATE_TRANSACTION, payload: { from, to, amount } });
export const getTransactionListAC = (userId) => ({ type: types.GET_TRANSACTION_LIST, payload: { userId } });





///===================================
export const loginAC = (email, password, remember) => ({ type: types.LOGIN, payload: { email, password, remember } });
export const loginSuccessAC = (userData) => ({ type: types.LOGIN_SUCCESS, payload: { userData } });
export const loginErrorAC = (error) => ({ type: types.LOGIN_ERROR, payload: { error } });
export const logoutAC = () => ({ type: types.LOGOUT });
export const checkAuthAC = () => ({ type: types.CHECK_AUTH });
export const checkAuthSuccessAC = (isAuth, userData) => ({ type: types.CHECK_AUTH_SUCCESS, payload: { isAuth, userData } });
export const checkAuthErrorAC = (error) => ({ type: types.CHECK_AUTH_ERROR, payload: { error } });
export const registrationAC = (email, firstName, lastName, password) => ({ type: types.REGISTRATION, payload: { email, firstName, lastName, password } });
export const registrationSuccessAC = () => ({ type: types.REGISTRATION_SUCCESS });
export const registrationErrorAC = (error) => ({ type: types.REGISTRATION_ERROR, payload: { error } });


//modal
export const openModalAC = (type) => ({ type: types.OPEN_MODAL, payload: { type } });
export const closeModalAC = () => ({ type: types.CLOSE_MODAL });
export const isModalLoadingAC = () => ({ type: types.IS_MODAL_LOADING });
export const setModalMessageAC = (msg, type) => ({ type: types.SET_MODAL_MESSAGE, payload: { msg, type } });
export const removeModalMessageAC = () => ({ type: types.REMOVE_MODAL_MESSAGE });