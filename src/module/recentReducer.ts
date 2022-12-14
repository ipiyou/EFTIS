import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const local = localStorage.getItem("recent");

interface RecentState {
  recent: string[];
  Focus: boolean;
}

const initialState = {
  recent: local ? JSON.parse(local) : [],
  Focus: false,
  Search: false,
} as RecentState;

export const recentSlice = createSlice({
  name: "recent",
  initialState,
  reducers: {
    addRecent(state, action: PayloadAction<string>) {
      const recentList = state.recent;
      const keyWord = action.payload;
      if (recentList.includes(keyWord)) {
        state.recent = recentList.filter((e) => e !== keyWord);
      }
      if (keyWord !== "") {
        state.recent.unshift(action.payload);
        localStorage.setItem("recent", JSON.stringify(state.recent));
      }
    },
    DelRecent(state, action: PayloadAction<string>) {
      const recentList = state.recent;
      const keyWord = action.payload;
      state.recent = recentList.filter((e) => e !== keyWord);

      localStorage.setItem("recent", JSON.stringify(state.recent));
    },
    SetFocus(state, action: PayloadAction<boolean>) {
      state.Focus = action.payload;
    },
  },
});

export const { addRecent, DelRecent, SetFocus } = recentSlice.actions;

export default recentSlice;
