import Cookies from 'js-cookie';
import { call, put, takeEvery } from 'redux-saga/effects';
import { getTransactionListWorker } from './transactionsSaga';
import { getOwnContactsWorker, getContactsWorker } from './contactsSaga';
import { getCurrentProfileWorker } from './profileSaga';
import * as types from '../types/types';
import * as actions from '../actions/actions';
import * as api from '../../services/apiService';

function* loginWorker({ payload }) {
  yield put(actions.setIsLoadingUserAC(true));
  const { email, password, remember } = payload;

  try {
    const user = yield call(api.loginRequest, email, password);

    const userId = user.data.user.id;
    const userEmail = user.data.user.email;
    const accessToken = user.data.access_token;
    const expiresIn = user.data.expires_in / 60 / 60 / 24;

    if (remember) {
      yield Cookies.set('accessToken', `${accessToken}`, { expires: expiresIn });
    }

    yield getCurrentProfileWorker({ payload: { userId } });
    yield getOwnContactsWorker({ payload: { userId } });
    yield getContactsWorker({ payload: { from: 0, to: 10, page: 1 } });
    yield getTransactionListWorker({ payload: { userId } });

    yield put(actions.setUserDataAC({ id: userId, email: userEmail }));
    yield put(actions.setIsAuthAC(true));
  } catch (e) {
    yield put(actions.setErrorUserAC(e));
    console.log('LOGIN SAGA ERROR: ', e, e?.response);
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

      yield getCurrentProfileWorker({ payload: { userId } });
      yield getOwnContactsWorker({ payload: { userId } });
      yield getContactsWorker({ payload: { from: 0, to: 10, page: 1 } });
      yield getTransactionListWorker({ payload: { userId } });

      yield put(actions.setUserDataAC({ id: userId, email: userEmail }));
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