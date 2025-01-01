import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedGame: null,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    selectGame: (state, action) => {
      state.selectedGame = action.payload;
    },
  },
});

export const { selectGame } = gameSlice.actions;
export default gameSlice.reducer;
