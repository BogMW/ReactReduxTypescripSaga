import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'src/app/store';

import { HistoryState } from './historyStore';

const getState = (state: RootState): HistoryState => state.history;

export const getHistory = createSelector(
  getState,
  (state: HistoryState) => state.history
);
