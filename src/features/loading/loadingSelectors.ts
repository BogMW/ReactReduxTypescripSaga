import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'src/app/store';

import { LoadingState } from './loadingStore';

const getState = (state: RootState): LoadingState => state.loading;

export const getIsLoading = createSelector(
  getState,
  (state: LoadingState) => state.isLoading
);
