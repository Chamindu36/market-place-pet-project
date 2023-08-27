import { compose, createStore, applyMiddleware, Middleware } from 'redux';

import { persistStore, persistReducer, PersistConfig } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import logger from 'redux-logger';

// import thunk from 'redux-thunk'; // No need to use thunks when using sagas
import createSagaMiddleware from 'redux-saga'

import { rootReducer } from './root-reducer';
import { rootSaga } from './root-saga';

export type RootState = ReturnType<typeof rootReducer>;

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
};

type ExtendedPersistConfig = PersistConfig<RootState> & {
    whitelist: Array<keyof RootState>;
};


const persistConfig : ExtendedPersistConfig= {
    key: 'root',
    storage,
    whitelist: ['cart']
};

const sagaMiddleWare = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [
    process.env.NODE_ENV !== 'production' && logger,
    sagaMiddleWare
].filter((middleware): middleware is Middleware =>Boolean(middleware));

// Add dev tool extension in chrome to see states, acions and changes
const composeEnhancer =
    (process.env.NODE_ENV !== 'production' &&
        window &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = createStore(
    persistedReducer,
    undefined,
    composedEnhancers
);

sagaMiddleWare.run(rootSaga);

export const persistor = persistStore(store);

