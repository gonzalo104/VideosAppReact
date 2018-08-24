import {createStore, applyMiddleware} from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import reducer from './reducers/index';
import storage from 'redux-persist/lib/storage';
import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';

/*const store = createStore(reducer, {    
    suggestionList: [],
    categoryList  : []
});*/
const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['navigation']
  }

const persistedReducer = persistReducer(persistConfig, reducer);

const navigationMiddleware = createReactNavigationReduxMiddleware(
    'root',
    state => state.navigation
)

let store     = createStore(
    persistedReducer, 
    applyMiddleware(navigationMiddleware)
)
let persistor = persistStore(store)

export {store, persistor};

 