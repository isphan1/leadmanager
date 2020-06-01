import {createStore,applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import rootReducer from '../redux/rootReducer'

//persist 

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const persistConfig = {
  key: 'root',
  storage,
}

const middleware = [thunk]


const persistedReducer = persistReducer(persistConfig, rootReducer)

    const store = createStore(
        // rootReducer,
        persistedReducer,
        composeWithDevTools(applyMiddleware(...middleware))
    )

const persistor = persistStore(store)
  
export  {store,persistor}
