import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import rootReducer from './reducers/rootReducer';
import rootSaga from './sagas/rootSaga';

const persistConfig = {
	key: 'userData',
	storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const SagaMiddleware = createSagaMiddleware();

export const store = createStore(
	persistedReducer,
	compose(
		applyMiddleware(SagaMiddleware),
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	)
);

export const persistor = persistStore(store);

SagaMiddleware.run(rootSaga);