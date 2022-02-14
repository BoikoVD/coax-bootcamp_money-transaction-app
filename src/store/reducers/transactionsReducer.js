import * as types from '../types/types';

const defaultState = {
  transactions: [],
  balance: 0,
  isLoading: false,
  error: null
};

export default function transactionsReducer(state = defaultState, action) {
  switch (action.type) {
    case types.CREATE_TRANSACTION:
      return {
        ...state, isLoading: true
      }
    case types.CREATE_TRANSACTION_SUCCESS:
      return {
        ...state, balance: action.payload.newBalance, isLoading: false
      }
    case types.CREATE_TRANSACTION_ERROR:
      return {
        ...state, isLoading: false
      }
    case types.GET_TRANSACTION_LIST:
      return {
        ...state, isLoading: true
      }
    case types.GET_TRANSACTION_LIST_SUCCESS:
      return {
        ...state, transactions: action.payload.list, balance: action.payload.newBalance, isLoading: false
      }
    case types.GET_TRANSACTION_LIST_ERROR:
      return {
        ...state, error: action.payload.error, isLoading: false
      }
    default:
      return state;
  }
}