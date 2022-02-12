import { all, spawn } from 'redux-saga/effects';
import { authenticationSaga } from './authenticationSaga';
import { profileSaga } from './profileSaga';

export default function* rootSaga() {
  const sagas = [authenticationSaga, profileSaga];
  yield all(
    sagas.map(s => spawn(s))
  )
}