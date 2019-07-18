import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import boardReducer from './reducers/boardReducer';
import collectionsReducer from './reducers/collectionsReducer';

const persistConfig = {
  key: 'primary',
  storage
};

const rootReducer = combineReducers({
  board: boardReducer,
  collections: collectionsReducer
});

export default persistReducer(persistConfig, rootReducer);
