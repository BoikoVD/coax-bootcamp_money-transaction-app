import { all, spawn } from 'redux-saga/effects';
import { authenticationSaga } from './authenticationSaga';

export default function* rootSaga() {
  const sagas = [authenticationSaga];
  yield all(
    sagas.map(s => spawn(s))
  )
}