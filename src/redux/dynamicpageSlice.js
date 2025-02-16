import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedPage: null,
};

const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    selectPage: (state, action) => {
      state.selectedPage = action.payload;
    },
  },
});

export const { selectPage } = pageSlice.actions;
export default pageSlice.reducer;
