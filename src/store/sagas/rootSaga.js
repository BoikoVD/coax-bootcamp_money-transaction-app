import { all, spawn } from 'redux-saga/effects';
import { authenticationSaga } from './authenticationSaga';
import { contactsSaga } from './contactsSaga';
import { profileSaga } from './profileSaga';

export default function* rootSaga() {
  const sagas = [authenticationSaga, profileSaga, contactsSaga];
  yield all(
    sagas.map(s => spawn(s))
  )
}