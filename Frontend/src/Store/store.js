import { compose, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { rootReducer } from './root-reducer'; // Import your root reducer
import { rootSaga } from './root-saga'; // Import your root saga
import logger from 'redux-logger';

// Create saga middleware
const sagaMiddleware = createSagaMiddleware();

// Redux Persist configuration
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user'],
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [logger, sagaMiddleware]

const composeEnhancer = window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));
// Create Redux store with persisted reducer, saga middleware, and logger middleware
const store = createStore(
    persistedReducer,
    undefined,
    composedEnhancers
);

// Run root saga
sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

export default store;
