import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'src/app/store';

import { PredictState } from './predictStore';

const getState = (state: RootState): PredictState => state.predict;

export const getNationality = createSelector(
  getState,
  (state: PredictState) => state.nationality
);

export const getGender = createSelector(
  getState,
  (state: PredictState) => state.gender
);
