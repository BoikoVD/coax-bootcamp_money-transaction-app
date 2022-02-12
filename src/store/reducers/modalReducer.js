import * as types from '../types/types';

const defaultState = {
  modalType: null,
  isModalVisible: false,
  isModalLoading: false,
  modalMessage: null,
  modalMessageType: null
};

export default function modalReducer(state = defaultState, action) {
  switch (action.type) {
    case types.OPEN_MODAL:
      return {
        ...state, isModalVisible: true, modalType: action.payload
      }
    case types.CLOSE_MODAL:
      return {
        ...state, isModalVisible: false, modalType: null
      }
    case types.IS_MODAL_LOADING:
      return {
        ...state, isModalLoading: !state.isModalLoading
      }
    case types.SET_MODAL_MESSAGE:
      return {
        ...state, modalMessage: action.payload.msg, modalMessageType: action.payload.type
      }
    case types.REMOVE_MODAL_MESSAGE:
      return {
        ...state, modalMessage: null, modalMessageType: null
      }
    default:
      return state;
  }
}