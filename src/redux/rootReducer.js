import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import boardReducer from './reducers/boardReducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['board']
};

const rootReducer = combineReducers({
  board: boardReducer
});

export default persistReducer(persistConfig, rootReducer);
