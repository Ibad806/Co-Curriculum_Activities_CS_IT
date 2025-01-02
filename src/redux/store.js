import { configureStore } from '@reduxjs/toolkit';
import gameReducer from './gameSlice';
import ticketsReducer from "./ticketsSlice";

export const store = configureStore({
  reducer: {
    game: gameReducer,
    tickets: ticketsReducer,
  },
});
