import * as types from '../types/types';

export const setUserAC = (userData) => ({ type: types.SET_USER, payload: userData });