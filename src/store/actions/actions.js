import * as types from '../types/types';

export const setIsAuthAC = (boolean) => ({ type: types.SET_IS_AUTH, payload: boolean });
export const setUserProfileDataAC = (userData) => ({ type: types.SET_USER_PROFILE_DATA, payload: userData });
export const userLoginRequestAC = (email, password, remember) => ({ type: types.USER_LOGIN_REQUEST, payload: { email, password, remember } });
export const setCurrentProfileDataAC = (profileData, isCurrent) => ({ type: types.SET_CURRENT_PROFILE_DATA, payload: { profileData, isCurrent } });