import { call, put, select, takeEvery } from 'redux-saga/effects';
import * as types from '../types/types';
import * as actions from '../actions/actions';
import * as api from '../../services/apiService';
import { removeDuplicates } from '../../helpers/helpers';

function* createTransactionWorker({ payload }) {
  yield put(actions.isModalLoadingAC());
  const { from, to, amount } = payload;

  try {
    if (amount <= 0) {
      throw new Error("Please enter the amount of money you want to send");
    }
    if (from === to) {
      throw new Error("You cannot send money to yourself");
    }
    const fromTransactions = yield call(api.getTransactionsRequest, from, "from");
    const toTransactions = yield call(api.getTransactionsRequest, from, "to");

    let startCount = 1000;
    let fromCount = 0;
    let toCount = 0;
    for (let f of fromTransactions.data) {
      if (f.from === f.to) {
        startCount = f.amount;
      } else {
        fromCount = fromCount + f.amount;
      }
    }
    for (let t of toTransactions.data) {
      if (t.from !== t.to) {
        toCount = toCount + t.amount;
      }
    }
    const balance = startCount + toCount - fromCount;
    if (balance < amount) {
      throw new Error("Not enough money in your wallet");
    }

    const newTransactionResponse = yield call(api.createTransactionRequest, from, to, amount);
    let newTransaction = newTransactionResponse.data[0];

    const profile = yield call(api.getProfileRequest, newTransaction.to);
    newTransaction.firstName = profile.data[0].firstName;
    newTransaction.lastName = profile.data[0].lastName;
    newTransaction.email = profile.data[0].email;
    newTransaction.created_at = Date.parse(newTransaction.created_at);
    newTransaction.amount = "- " + newTransaction.amount;
    newTransaction.key = newTransaction.id;
    const currentTransactions = yield select(s => s.transactionsReducer.transactions);

    const newTransactions = [newTransaction, ...currentTransactions];
    const newBalance = Number((balance - amount).toFixed(2));

    yield put(actions.createTransactionSuccessAC(newTransactions, newBalance));
    yield put(actions.closeModalAC());
    yield put(actions.setModalMessageAC(
      "The transaction was completed successfully!",
      "success"
    ));
  } catch (e) {
    let msg;
    if (e.message) {
      msg = e.message
    } else {
      msg = "Something is wrong. Please try again later!";
    }
    yield put(actions.setModalMessageAC(
      msg,
      "error"
    ));
    console.log("CREATE TRANSACTION SAGA ERROR: ", e, e.response);
  }
  yield put(actions.isModalLoadingAC());
};

export function* getTransactionListWorker({ payload }) {
  const { userId } = payload;

  try {
    const fromTransactions = yield call(api.getTransactionsRequest, userId, "from");
    const toTransactions = yield call(api.getTransactionsRequest, userId, "to");

    let startCount = 1000;
    let fromCount = 0;
    let toCount = 0;
    for (let f of fromTransactions.data) {
      if (f.from === f.to) {
        startCount = f.amount;
      } else {
        fromCount = fromCount + f.amount;
      }
    }
    for (let t of toTransactions.data) {
      if (t.from !== t.to) {
        toCount = toCount + t.amount;
      }
    }
    const balance = Number((startCount + toCount - fromCount).toFixed(2));

    let transactions = [...fromTransactions.data, ...toTransactions.data];
    transactions = removeDuplicates(transactions);
    transactions = transactions.map((t) => {
      if (t.to === userId) {
        t.amount = "+ " + t.amount;
      } else {
        t.amount = "- " + t.amount;
      }
      t.created_at = Date.parse(t.created_at);
      return t;
    });
    transactions = transactions.sort((a, b) => a.created_at > b.created_at ? -1 : 1);
    let profilesId = [];
    for (let t of transactions) {
      if (!profilesId.includes(t.from) && t.from !== userId) {
        profilesId.push(t.from);
      }
      if (!profilesId.includes(t.to) && t.to !== userId) {
        profilesId.push(t.to);
      }
    };

    const profiles = yield call(api.getContactProfilesRequest, profilesId);
    transactions = transactions.map((t) => {
      for (let p of profiles.data) {
        if (p.user === t.from || p.user === t.to) {
          t.firstName = p.firstName;
          t.lastName = p.lastName;
          t.email = p.email;
        }
      }
      t.key = t.id;
      if (t.from === t.to) {
        t.firstName = "-";
        t.lastName = "-";
        t.email = "Funding";
      }
      return t;
    });

    yield put(actions.getTransactionListSuccessAC(transactions, balance));
  } catch (e) {
    yield put(actions.getTransactionListErrorAC(e));
    console.log("GET TRANSACTION LIST SAGA ERROR: ", e, e.response);
  }
};

export function* transactionsSaga() {
  yield takeEvery(types.CREATE_TRANSACTION, createTransactionWorker);
  yield takeEvery(types.GET_TRANSACTION_LIST, getTransactionListWorker);
};