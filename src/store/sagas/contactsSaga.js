import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import { contactsParser, pageCountHelper } from '../../helpers/helpers';
import * as types from '../types/types';
import * as actions from '../actions/actions';
import * as api from '../../services/apiService';

export function* getOwnContactsWorker({ payload }) {
  const { userId } = payload;
  try {
    const contacts = yield call(api.getOwnContactsRequest, userId);
    yield put(actions.deleteContactSuccessAC(contactsParser(contacts.data)));
  } catch (e) {
    console.log("GET OWN CONTACTS SAGA ERROR", e, e?.response);
  }
};

export function* getProfilesForContactsWorker({ payload }) {
  const { searchValue, page, type } = payload;
  const from = (page * 10) - 1 - 9;
  const to = (page * 10) - 1;
  yield put(actions.setPaginationAC(page));

  try {
    let response;
    if (type === "myContacts") {
      const userContacts = yield select(s => s.contactsReducer.userContacts);
      response = yield call(api.getProfilesOfContactsRequest, from, to, searchValue, userContacts);
    }
    if (type === "allUsers") {
      const userData = yield select(s => s.userReducer.userData);
      response = yield call(api.getProfilesOfAllUsersRequest, from, to, searchValue, userData.id);
    }

    const profiles = response.data.map((i) => {
      return { ...i, isLoading: false }
    });

    const itemsCount = pageCountHelper(response.headers["content-range"]);

    yield put(actions.getProfilesForContactsSuccessAC(profiles, itemsCount));
  } catch (e) {
    yield put(actions.getProfilesForContactsErrorAC());
    console.log("GET CONTACTS SAGA ERROR", e, e?.responsee);
  }
};

function* addContactWorker({ payload }) {
  const { id } = payload;

  try {
    const user = yield select(s => s.userReducer.userData);
    const response = yield call(api.addContactRequest, user.id, id);

    yield put(actions.addContactSuccessAC(response.data[0].contact, id));
  } catch (e) {
    yield put(actions.addContactErrorAC(id));
    console.log("ADD CONTACT SAGA ERROR: ", e, e?.response);
  }
};

function* deleteContactWorker({ payload }) {
  const { id } = payload;

  try {
    const user = yield select(s => s.userReducer.userData);
    const userContacts = yield select(s => s.contactsReducer.userContacts);
    yield call(api.deleteContactRequest, user.id, id);

    const newContacts = userContacts.filter((i) => i !== id);

    yield put(actions.deleteContactSuccessAC(newContacts, id));
  } catch (e) {
    yield put(actions.deleteContactErrorAC(id));
    console.log("ADD CONTACT SAGA ERROR: ", e, e?.response);
  }
};

export function* contactsSaga() {
  yield takeLatest(types.GET_PROFILES_FOR_CONTACTS, getProfilesForContactsWorker);
  yield takeEvery(types.ADD_CONTACT, addContactWorker);
  yield takeEvery(types.DELETE_CONTACT, deleteContactWorker);
};