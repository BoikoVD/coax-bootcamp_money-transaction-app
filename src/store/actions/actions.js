import * as types from '../types/types';

export const loginAC = (email, password, remember) => ({ type: types.LOGIN, payload: { email, password, remember } });
export const loginSuccessAC = (userData) => ({ type: types.LOGIN_SUCCESS, payload: { userData } });
export const loginErrorAC = (error) => ({ type: types.LOGIN_ERROR, payload: { error } });
export const logoutAC = () => ({ type: types.LOGOUT });
export const logoutSuccessAC = () => ({ type: types.LOGOUT_SUCCESS });
export const logoutErrorAC = (error) => ({ type: types.LOGOUT_ERROR, payload: { error } });
export const checkAuthAC = () => ({ type: types.CHECK_AUTH });
export const checkAuthSuccessAC = (isAuth, userData) => ({ type: types.CHECK_AUTH_SUCCESS, payload: { isAuth, userData } });
export const checkAuthErrorAC = (error) => ({ type: types.CHECK_AUTH_ERROR, payload: { error } });
export const registrationAC = (email, firstName, lastName, password) => ({ type: types.REGISTRATION, payload: { email, firstName, lastName, password } });
export const registrationSuccessAC = () => ({ type: types.REGISTRATION_SUCCESS });
export const registrationErrorAC = (error) => ({ type: types.REGISTRATION_ERROR, payload: { error } });

export const getProfileAC = (id) => ({ type: types.GET_PROFILE, payload: { id } });
export const getProfileSuccessAC = (profileData, isCurrent) => ({ type: types.GET_PROFILE_SUCCESS, payload: { profileData, isCurrent } });
export const getProfileErrorAC = (error) => ({ type: types.GET_PROFILE_ERROR, payload: { error } });
export const editProfileDataAC = (newFirstName, newLastName, profileId) => ({ type: types.EDIT_PROFILE_DATA, payload: { newFirstName, newLastName, profileId } });
export const editProfileDataSuccessAC = (firstName, lastName) => ({ type: types.EDIT_PROFILE_DATA_SUCCESS, payload: { firstName, lastName } });
export const editProfileDataErrorAC = (error) => ({ type: types.EDIT_PROFILE_DATA_ERROR, payload: { error } });
export const resetPasswordAC = (newPassword) => ({ type: types.RESET_PASSWORD, payload: { newPassword } });
export const addThisUserToContactAC = (id) => ({ type: types.ADD_THIS_USER_TO_CONTACTS, payload: { id } });
export const addThisUserToContactSuccessAC = () => ({ type: types.ADD_THIS_USER_TO_CONTACTS_SUCCESS });
export const addThisUserToContactErrorAC = () => ({ type: types.ADD_THIS_USER_TO_CONTACTS_ERROR });
export const deleteThisUserFromContactsAC = (id) => ({ type: types.DELETE_THIS_USER_FROM_CONTACTS, payload: { id } });
export const deleteThisUserFromContactsSuccessAC = (id) => ({ type: types.DELETE_THIS_USER_FROM_CONTACTS_SUCCESS, payload: { id } });
export const deleteThisUserFromContactsErrorAC = (id) => ({ type: types.DELETE_THIS_USER_FROM_CONTACTS_ERROR, payload: { id } });

export const setContactsAC = (contacts) => ({ type: types.SET_CONTACTS, payload: contacts }); //check
export const setPaginationAC = (activePagination) => ({ type: types.SET_PAGINATION, payload: { activePagination } });
export const setItemsCountOfPaginationAC = (itemsCount) => ({ type: types.SET_ITEMS_COUNT_OF_PAGINATION, payload: { itemsCount } });
export const getProfilesForContactsAC = (page, searchValue, type) => ({ type: types.GET_PROFILES_FOR_CONTACTS, payload: { page, searchValue, type } });
export const getProfilesForContactsSuccessAC = (profiles, itemsCount) => ({ type: types.GET_PROFILES_FOR_CONTACTS_SUCCESS, payload: { profiles, itemsCount } });
export const getProfilesForContactsErrorAC = () => ({ type: types.GET_PROFILES_FOR_CONTACTS_ERROR });
export const addContactAC = (id) => ({ type: types.ADD_CONTACT, payload: { id } });
export const addContactSuccessAC = (contactId, id) => ({ type: types.ADD_CONTACT_SUCCESS, payload: { contactId, id } });
export const addContactErrorAC = (id) => ({ type: types.ADD_CONTACT_ERROR, payload: { id } });
export const deleteContactAC = (id) => ({ type: types.DELETE_CONTACT, payload: { id } });
export const deleteContactSuccessAC = (contacts, id) => ({ type: types.DELETE_CONTACT_SUCCESS, payload: { contacts, id } });
export const deleteContactErrorAC = (id) => ({ type: types.DELETE_CONTACT_ERROR, payload: { id } });

export const createTransactionAC = (from, to, amount) => ({ type: types.CREATE_TRANSACTION, payload: { from, to, amount } });
export const createTransactionSuccessAC = (newTransactions, newBalance) => ({ type: types.CREATE_TRANSACTION_SUCCESS, payload: { newTransactions, newBalance } });
export const createTransactionErrorAC = () => ({ type: types.CREATE_TRANSACTION_ERROR });
export const getTransactionListAC = (userId) => ({ type: types.GET_TRANSACTION_LIST, payload: { userId } });
export const getTransactionListSuccessAC = (list, newBalance) => ({ type: types.GET_TRANSACTION_LIST_SUCCESS, payload: { list, newBalance } });
export const getTransactionListErrorAC = (error) => ({ type: types.GET_TRANSACTION_LIST_ERROR, payload: { error } });

export const openModalAC = (type) => ({ type: types.OPEN_MODAL, payload: { type } });
export const closeModalAC = () => ({ type: types.CLOSE_MODAL });
export const isModalLoadingAC = () => ({ type: types.IS_MODAL_LOADING });
export const setModalMessageAC = (msg, type) => ({ type: types.SET_MODAL_MESSAGE, payload: { msg, type } });
export const removeModalMessageAC = () => ({ type: types.REMOVE_MODAL_MESSAGE });