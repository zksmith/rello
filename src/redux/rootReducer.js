import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "./reducers/userReducer";
import boardReducer from "./reducers/boardReducer";
import collectionsReducer from "./reducers/collectionsReducer";

const persistConfig = {
  key: "primary",
  storage,
  whitelist: ["board", "collectionState"]
};

const rootReducer = combineReducers({
  board: boardReducer,
  collectionState: collectionsReducer,
  user: userReducer
});

export default persistReducer(persistConfig, rootReducer);
