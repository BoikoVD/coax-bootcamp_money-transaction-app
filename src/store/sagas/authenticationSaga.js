import Cookies from 'js-cookie';
import { call, put, takeEvery } from 'redux-saga/effects';
import { contactsParser } from '../../helpers/helpers';
import * as types from '../types/types';
import * as actions from '../actions/actions';
import * as api from '../../services/apiService';

function* loginWorker({ payload }) {
  yield put(actions.setIsLoadingUserAC(true));
  try {
    const { email, password, remember } = payload;
    const user = yield call(api.loginRequest, email, password);
    const userId = user.data.user.id;
    const userEmail = user.data.user.email;
    const accessToken = user.data.access_token;
    const expiresIn = user.data.expires_in / 60 / 60 / 24;
    if (remember) {
      yield Cookies.set('accessToken', `${accessToken}`, { expires: expiresIn });
    }
    const profileData = yield call(api.getProfileRequest, userId, "user");
    const contacts = yield call(api.getOwnContactsRequest, userId);

    yield put(actions.setUserDataAC({ id: userId, email: userEmail }));
    yield put(actions.setProfileDataAC(profileData.data[0], true));
    yield put(actions.setContactsAC(contactsParser(contacts.data)));
    yield put(actions.setIsAuthAC(true));
  } catch (e) {
    yield put(actions.setErrorUserAC(e));
    console.log('LOGIN SAGA ERROR: ', e);
  }
  yield put(actions.setIsLoadingUserAC(false));
};

function* logoutWorker() {
  yield Cookies.remove('accessToken');
  yield put(actions.setUserDataAC({ id: null, email: null }));
  yield put(actions.setIsAuthAC(false));
};

function* checkAuthWorker() {
  yield put(actions.setIsLoadingUserAC(true));
  const accessToken = yield Cookies.get('accessToken')
  if (accessToken) {
    try {
      const user = yield call(api.getUserRequest);
      const userId = user.data.id;
      const userEmail = user.data.email;
      const profileData = yield call(api.getProfileRequest, userId, "user");
      const contacts = yield call(api.getOwnContactsRequest, userId);
      yield put(actions.setUserDataAC({ id: userId, email: userEmail }));
      yield put(actions.setProfileDataAC(profileData.data[0], true));
      yield put(actions.setContactsAC(contactsParser(contacts.data)));
      yield put(actions.getTransactionListAC(userId));
      yield put(actions.setIsAuthAC(true));
    } catch (e) {
      yield put(actions.setErrorUserAC(e));
      console.log("CHECK AUTH SAGA ERROR: ", e);
    }
  } else {
    yield put(actions.setIsAuthAC(false));
  }
  yield put(actions.setIsLoadingUserAC(false));
};

function* registrationWorker({ payload }) {
  yield put(actions.setIsLoadingUserAC(true));
  try {
    const { email, firstName, lastName, password } = payload;
    const createdUser = yield call(api.signUpRequest, email, password);
    const userId = createdUser.data.user.id;
    const accessToken = createdUser.data.access_token;
    yield call(api.createProfileRequest, userId, email, firstName, lastName, accessToken);
    yield put(actions.setIsModalVisibleUserAC(true));
  } catch (e) {
    yield put(actions.setErrorUserAC(e));
    console.log('REGISTRATION SAGA ERROR: ', e.response.data);
  }
  yield put(actions.setIsLoadingUserAC(false));
};

export function* authenticationSaga() {
  yield takeEvery(types.LOGIN, loginWorker);
  yield takeEvery(types.LOGOUT, logoutWorker);
  yield takeEvery(types.CHECK_AUTH, checkAuthWorker);
  yield takeEvery(types.REGISTRATION, registrationWorker);
};