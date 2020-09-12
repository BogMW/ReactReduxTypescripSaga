import { createSlice } from '@reduxjs/toolkit';

export interface Search {
  id: number;
  name: string;
  gender: string;
  country: string;
}

const reHydrateStore = () => {
  if (
    localStorage.getItem('appHistory') !== null &&
    localStorage.getItem('appHistory') !== undefined
  ) {
    return JSON.parse(localStorage.getItem('appHistory') || '{}');
  }
  return { history: [] };
};

export interface HistoryState {
  history: Search[];
}

const initialState: HistoryState = {
  history: reHydrateStore().history || [],
};

export const reducerSlice = createSlice({
  name: 'historyReducer',
  initialState,
  reducers: {
    setHistory: (state, action): void => {
      state.history = [...state.history, action.payload];
    },
  },
});

export const { setHistory } = reducerSlice.actions;

export default reducerSlice.reducer;
