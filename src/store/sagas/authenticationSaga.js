import Cookies from 'js-cookie';
import { call, put, takeEvery } from 'redux-saga/effects';
import { getTransactionListWorker } from './transactionsSaga';
import { getOwnContactsWorker, getContactsWorker } from './contactsSaga';
import { getCurrentProfileWorker } from './profileSaga';
import * as types from '../types/types';
import * as actions from '../actions/actions';
import * as api from '../../services/apiService';

function* loginWorker({ payload }) {
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

    yield put(actions.loginSuccessAC({ id: userId, email: userEmail }));
  } catch (e) {
    yield put(actions.setModalMessageAC(
      `${e.response.data.error_description}`,
      "error"
    ));
    yield put(actions.loginErrorAC(e));
    console.log('LOGIN SAGA ERROR: ', e, e?.response);
  }
};

function* logoutWorker() {
  yield Cookies.remove('accessToken');
};

function* checkAuthWorker() {
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

      yield put(actions.checkAuthSuccessAC(true, { id: userId, email: userEmail }));
    } catch (e) {
      yield put(actions.checkAuthErrorAC(e));
      console.log("CHECK AUTH SAGA ERROR: ", e, e?.response);
    }
  } else {
    yield put(actions.checkAuthSuccessAC(false, { id: null, email: null }));
  }
};

function* registrationWorker({ payload }) {
  const { email, firstName, lastName, password } = payload;
  try {
    const createdUser = yield call(api.signUpRequest, email, password);

    const userId = createdUser.data.user.id;
    const accessToken = createdUser.data.access_token;

    yield call(api.createProfileRequest, userId, email, firstName, lastName, accessToken);

    yield put(actions.registrationSuccessAC());
    yield put(actions.openModalAC("registration"));
  } catch (e) {
    yield put(actions.setModalMessageAC(
      `${e.response.data.msg}`,
      "error"
    ));
    yield put(actions.registrationErrorAC(e));
    console.log('REGISTRATION SAGA ERROR: ', e, e?.response);
  }
};

export function* authenticationSaga() {
  yield takeEvery(types.LOGIN, loginWorker);
  yield takeEvery(types.LOGOUT, logoutWorker);
  yield takeEvery(types.CHECK_AUTH, checkAuthWorker);
  yield takeEvery(types.REGISTRATION, registrationWorker);
};