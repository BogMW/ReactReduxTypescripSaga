import { createSlice, PayloadAction, createAction } from '@reduxjs/toolkit';
import { SagaIterator } from 'redux-saga';
import { all, call, takeLatest } from 'redux-saga/effects';
import { fetchDataSaga } from './predictSagas';

export interface Nationality {
  name: string;
  country: Country[];
}

export interface Gender {
  name: string;
  gender: string;
  probability: number;
  count: number;
}

export interface Country {
  country_id: string;
  probability: number;
}

export interface PredictState {
  nationality: Nationality;
  gender: Gender;
}

const initialState: PredictState = {
  nationality: {
    name: '',
    country: [
      {
        country_id: '',
        probability: 0,
      },
    ],
  },
  gender: {
    name: '',
    gender: '',
    probability: 0,
    count: 0,
  },
};

interface SetPredictPayload {
  name: string;
}

export const reducerSlice = createSlice({
  name: 'predictReducer',
  initialState,
  reducers: {
    setNationalityData: (state, action: PayloadAction<Nationality>): void => {
      state.nationality = action.payload;
    },
    setGenderData: (state, action: PayloadAction<Gender>): void => {
      state.gender = action.payload;
    },
    resetData: (state): void => {
      state.nationality = initialState.nationality;
      state.gender = initialState.gender;
    },
  },
});

export const fetchData = createAction<string>('predict/fetchNationality');

function* watchNationalitySagas(): SagaIterator {
  yield takeLatest(fetchData, fetchDataSaga);
}

export function* watchPredictSagas(): SagaIterator {
  yield all([call(watchNationalitySagas)]);
}

export const {
  setNationalityData,
  setGenderData,
  resetData,
} = reducerSlice.actions;

export default reducerSlice.reducer;
