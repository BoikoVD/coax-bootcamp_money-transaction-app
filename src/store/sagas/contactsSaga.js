import { call, put, select, takeEvery } from 'redux-saga/effects';
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

export function* getContactsWorker({ payload }) {
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

    yield put(actions.getContactsSuccessAC(profiles, userContacts.length));
  } catch (e) {
    yield put(actions.getContactsErrorAC());
    console.log("GET CONTACTS SAGA ERROR", e, e?.responsee);
  }
};

function* getAllProfilesWorker({ payload }) {
  const { from, to, page } = payload;
  yield put(actions.setPaginationAC(page));

  try {
    const response = yield call(api.getProfilesWithPaginationRequest, from, to);
    const profiles = response.data.map((i) => {
      return { ...i, isLoading: false }
    });
    const itemsCount = pageCountHelper(response.headers["content-range"]);

    yield put(actions.getAllProfilesSuccessAC(profiles, itemsCount));
  } catch (e) {
    yield put(actions.getAllProfilesErrorAC());
    console.log("GET ALLUSERS SAGA ERROR", e, e?.response);
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
  yield takeEvery(types.GET_CONTACTS, getContactsWorker);
  yield takeEvery(types.GET_ALL_PROFILES, getAllProfilesWorker);
  yield takeEvery(types.ADD_CONTACT, addContactWorker);
  yield takeEvery(types.DELETE_CONTACT, deleteContactWorker);
};