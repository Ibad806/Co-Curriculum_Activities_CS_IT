import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Default localStorage for web
import gameReducer from "./gameSlice";
import ticketsReducer from "./ticketsSlice";

// Config for redux-persist
const persistConfig = {
  key: "root",
  storage,
};

// Combine all reducers
const rootReducer = combineReducers({
  game: gameReducer,
  tickets: ticketsReducer,
});

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store
export const store = configureStore({
  reducer: persistedReducer,
});

// Create the persistor
export const persistor = persistStore(store);
