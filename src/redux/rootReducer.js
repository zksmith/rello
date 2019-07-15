import { combineReducers } from 'redux';

import boardReducer from './reducers/boardReducer';

export const rootReducer = combineReducers({
  board: boardReducer
});
