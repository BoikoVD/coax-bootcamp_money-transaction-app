import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers/rootReducer';
import rootSaga from './sagas/rootSaga';

const persistConfig = {
  key: 'user',
  storage,
  whitelist: ['navigation']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  persistedReducer,
  composeWithDevTools(
    applyMiddleware(sagaMiddleware)
  )
);

export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);