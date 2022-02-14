import { call, put, select, takeEvery } from 'redux-saga/effects';
import * as types from '../types/types';
import * as actions from '../actions/actions';
import * as api from '../../services/apiService';
import { contactsParser, pageCountHelper } from '../../helpers/helpers';

export function* getOwnContactsWorker({ payload }) {
  const { userId } = payload;
  try {
    const contacts = yield call(api.getOwnContactsRequest, userId);
    yield put(actions.setContactsAC(contactsParser(contacts.data)));
  } catch (e) {
    console.log("GET OWN CONTACTS SAGA ERROR", e, e?.response);
  }
};

export function* getContactsWorker({ payload }) {
  yield put(actions.isLoadingContactsAC());
  const { from, to, page } = payload;
  yield put(actions.setPaginationAC(page));
  try {
    const userContacts = yield select(s => s.contactsReducer.userContacts);
    let response;
    if (userContacts.length > 10) {
      response = yield call(api.getContactProfilesRequest, userContacts.slice(from, to));
    } else {
      response = yield call(api.getContactProfilesRequest, userContacts);
    }
    const profiles = response.data.map((i) => {
      return { ...i, isLoading: false }
    });
    yield put(actions.setContactProfilesAC(profiles, userContacts.length));
  } catch (e) {
    console.log("GET CONTACTS SAGA ERROR", e);
  }
  yield put(actions.isLoadingContactsAC());
};

function* getAllProfilesWorker({ payload }) {
  yield put(actions.isLoadingContactsAC());
  const { from, to, page } = payload;
  yield put(actions.setPaginationAC(page));
  try {
    const response = yield call(api.getProfilesWithPaginationRequest, from, to);
    const profiles = yield response.data.map((i) => {
      return { ...i, isLoading: false }
    });
    const itemsCount = yield pageCountHelper(response.headers["content-range"]);
    yield put(actions.setContactProfilesAC(profiles, itemsCount));
  } catch (e) {
    console.log("GET ALLUSERS SAGA ERROR", e);
  }
  yield put(actions.isLoadingContactsAC());
};

function* addContactWorker({ payload }) {
  const { id } = payload;
  yield put(actions.isLoadingOneProfileAC(id, true));
  try {
    const user = yield select(s => s.userReducer.userData);
    const response = yield call(api.addContactRequest, user.id, id);
    console.log(response.data[0].contact);
    yield put(actions.setOneContactAC(response.data[0].contact));
  } catch (e) {
    console.log("ADD CONTACT SAGA ERROR: ", e.response.data);
  }
  yield put(actions.isLoadingOneProfileAC(id, false));
};

function* deleteContactWorker({ payload }) {
  const { id } = payload;
  yield put(actions.isLoadingOneProfileAC(id, true));
  try {
    const user = yield select(s => s.userReducer.userData);
    const userContacts = yield select(s => s.contactsReducer.userContacts);
    yield call(api.deleteContactRequest, user.id, id);
    const newContacts = userContacts.filter((i) => i !== id);
    yield put(actions.setContactsAC(newContacts));
  } catch (e) {
    console.log("ADD CONTACT SAGA ERROR: ", e.response.data);
  }
  yield put(actions.isLoadingOneProfileAC(id, false));
};

export function* contactsSaga() {
  yield takeEvery(types.GET_CONTACTS, getContactsWorker);
  yield takeEvery(types.GET_ALL_PROFILES, getAllProfilesWorker);
  yield takeEvery(types.ADD_CONTACT, addContactWorker);
  yield takeEvery(types.DELETE_CONTACT, deleteContactWorker);
};