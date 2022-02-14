import { call, put, select, takeEvery } from 'redux-saga/effects';
import * as types from '../types/types';
import * as actions from '../actions/actions';
import * as api from '../../services/apiService';

export function* getCurrentProfileWorker({ payload }) {
  const { userId } = payload;
  try {
    const profileData = yield call(api.getProfileRequest, userId);
    yield put(actions.getProfileSuccessAC(profileData.data[0], true));
  } catch (e) {
    console.log("GET CURRENT PROFILE SAGA ERROR", e, e?.response);
  }
};

function* getProfileWorker({ payload }) {
  const { id } = payload;

  if (id) {
    try {
      const response = yield call(api.getProfileRequest, id);

      if (response.data.length === 0) {
        throw new Error("Profile not found");
      } else {
        const profile = { ...response.data[0], isLoading: false };
        yield put(actions.getProfileSuccessAC(profile, false));
      }
    } catch (e) {
      yield put(actions.getProfileErrorAC(e));
      console.log("GET PROFILE SAGA ERROR: ", e, e?.response);
    }
  } else {
    try {
      const currentUser = yield select(s => s.userReducer.userData);
      const response = yield call(api.getProfileRequest, currentUser.id);

      const profile = { ...response.data[0], isLoading: false };
      yield put(actions.getProfileSuccessAC(profile, true));
    } catch (e) {
      yield put(actions.getProfileErrorAC(e));
      console.log("GET MY PROFILE SAGA ERROR: ", e, e?.response);
    }
  }
};

function* editProfileDataWorker({ payload }) {
  yield put(actions.isModalLoadingAC());
  const { newFirstName, newLastName, profileId } = payload;

  try {
    yield call(api.updateProfileDataRequest, newFirstName, newLastName, profileId);

    yield put(actions.editProfileDataSuccessAC(newFirstName, newLastName));
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
    console.log("EDIT PROFILE DATA ERROR: ", e, e?.response);
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
    console.log("RESET PASSWORD SAGA ERROR: ", e, e?.response);
  }

  yield put(actions.isModalLoadingAC());
};

function* addContactWorker({ payload }) {
  const { id } = payload;

  try {
    const user = yield select(s => s.userReducer.userData);
    const response = yield call(api.addContactRequest, user.id, id);

    yield put(actions.addContactSuccessAC(response.data[0].contact));
    yield put(actions.addThisUserToContactSuccessAC());
  } catch (e) {
    yield put(actions.addThisUserToContactErrorAC());
    console.log("ADD THIS CONTACT FROM PROFILE PAGE SAGA ERROR: ", e, e?.response);
  }
};

function* deleteContactWorker({ payload }) {
  const { id } = payload;

  try {
    const user = yield select(s => s.userReducer.userData);
    const userContacts = yield select(s => s.contactsReducer.userContacts);
    yield call(api.deleteContactRequest, user.id, id);

    const newContacts = userContacts.filter((i) => i !== id);

    yield put(actions.deleteContactSuccessAC(newContacts));
    yield put(actions.deleteThisUserFromContactsSuccessAC());
  } catch (e) {
    yield put(actions.deleteThisUserFromContactsErrorAC());
    console.log("ADD CONTACT FROM PAGE SAGA ERROR: ", e, e?.response);
  }
};

export function* profileSaga() {
  yield takeEvery(types.GET_PROFILE, getProfileWorker);
  yield takeEvery(types.EDIT_PROFILE_DATA, editProfileDataWorker);
  yield takeEvery(types.RESET_PASSWORD, resetPasswordWorker);
  yield takeEvery(types.ADD_THIS_USER_TO_CONTACTS, addContactWorker);
  yield takeEvery(types.DELETE_THIS_USER_FROM_CONTACTS, deleteContactWorker);
};