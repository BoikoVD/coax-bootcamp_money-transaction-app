import * as types from '../types/types';

const defaultState = {
  transactions: [],
  balance: 0,
  isLoading: false,
  error: null
};

export default function transactionsReducer(state = defaultState, action) {
  switch (action.type) {
    case types.IS_LOADING_TRANSACTIONS:
      return {
        ...state, isLoading: !state.isLoading
      }
    case types.TRANSACTION_SUCCESS:
      return {
        ...state, balance: action.payload.newBalance
      }
    default:
      return state;
  }
}