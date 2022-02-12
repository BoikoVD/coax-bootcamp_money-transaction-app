import { call, put, select, takeEvery } from 'redux-saga/effects';
import * as types from '../types/types';
import * as actions from '../actions/actions';
import * as api from '../../services/apiService';

function* profilePageWorker({ payload }) {
  yield put(actions.setIsLoadingProfileAC(true));
  const { id } = payload;
  if (id) {
    try {
      const profile = yield call(api.getProfileRequest, id);
      if (profile.data.length === 0) {
        throw new Error("Profile not found");
      } else {
        yield put(actions.setProfileDataAC(profile.data[0], false));
      }
    } catch (e) {
      yield put(actions.setErrorProfileAC(e));
      console.log("PROFILE PAGE SAGA ERROR: ", e);
    }
  } else {
    try {
      const currentUser = yield select(s => s.userReducer.userData);
      const profile = yield call(api.getProfileRequest, currentUser.id);
      yield put(actions.setProfileDataAC(profile.data[0], true));
    } catch (e) {
      yield put(actions.setErrorProfileAC(e));
      console.log("PROFILE MY PAGE SAGA ERROR: ", e);
    }
  }
  yield put(actions.setIsLoadingProfileAC(false));
};

function* updateProfileDataWorker({ payload }) {
  yield put(actions.isModalLoadingAC());
  const { newFirstName, newLastName, profileId } = payload;
  try {
    yield call(api.updateProfileDataRequest, newFirstName, newLastName, profileId);
    yield put(actions.setUpdatedProfileDataAC(newFirstName, newLastName));
    yield put(actions.closeModalAC());
    yield put(actions.setModalMessageAC(
      "Data saved successfully!",
      "success"
    ));
  } catch (e) {
    yield put(actions.setModalMessageAC(
      "Something is wrong. Please try again later!",
      "error"
    ));
    console.log("EDIT PERSONAL DATA ERROR: ", e.response);
  }
  yield put(actions.isModalLoadingAC());
};

function* resetPasswordWorker({ payload }) {
  yield put(actions.isModalLoadingAC());
  const { newPassword } = payload;
  try {
    yield call(api.resetPasswordRequest, newPassword);
    yield put(actions.closeModalAC());
    yield put(actions.setModalMessageAC(
      "Data saved successfully!",
      "success"
    ));
  } catch (e) {
    yield put(actions.setModalMessageAC(
      "Something is wrong. Please try again later!",
      "error"
    ));
    console.log("RESET PASSWORD SAGA ERROR: ", e);
  }
  yield put(actions.isModalLoadingAC());
};

export function* profileSaga() {
  yield takeEvery(types.GET_PROFILE, profilePageWorker);
  yield takeEvery(types.UPDATE_PROFILE_DATA, updateProfileDataWorker);
  yield takeEvery(types.RESET_PASSWORD, resetPasswordWorker);
};