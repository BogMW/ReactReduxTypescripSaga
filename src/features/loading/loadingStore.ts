import { createSlice } from '@reduxjs/toolkit';

export interface LoadingState {
  isLoading: boolean;
}

const initialState: LoadingState = {
  isLoading: false,
};

export const reducerSlice = createSlice({
  name: 'loadingReducer',
  initialState,
  reducers: {
    startLoading: (state): void => {
      state.isLoading = true;
    },
    stopLoading: (state): void => {
      state.isLoading = false;
    },
  },
});

export const { startLoading, stopLoading } = reducerSlice.actions;

export default reducerSlice.reducer;
