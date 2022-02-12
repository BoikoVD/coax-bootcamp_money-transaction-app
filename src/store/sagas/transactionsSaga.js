import { call, put, select, takeEvery } from 'redux-saga/effects';
import * as types from '../types/types';
import * as actions from '../actions/actions';
import * as api from '../../services/apiService';

function* createTransactionWorker({ payload }) {
  yield put(actions.isLoadingTransactionsAC());
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
    let fromCount, toCount = 0;
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
    yield call(api.createTransactionRequest, from, to, amount);

  } catch (e) {
    console.log("CREATE TRANSACTION SAGA ERROR: ", e);
  }
  yield put(actions.isLoadingTransactionsAC());
};

export function* transactionsSaga() {
  yield takeEvery(types.CREATE_TRANSACTION, createTransactionWorker);
};