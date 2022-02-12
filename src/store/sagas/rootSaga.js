import { all, spawn } from 'redux-saga/effects';
import { authenticationSaga } from './authenticationSaga';
import { profileSaga } from './profileSaga';
import { contactsSaga } from './contactsSaga';
import { transactionsSaga } from './transactionsSaga';

export default function* rootSaga() {
  const sagas = [
    authenticationSaga,
    profileSaga,
    contactsSaga,
    transactionsSaga
  ];
  yield all(
    sagas.map(s => spawn(s))
  )
}