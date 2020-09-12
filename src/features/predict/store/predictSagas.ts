import { put, call, all } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { PayloadAction } from '@reduxjs/toolkit';
import { toastr } from 'react-redux-toastr';
import {
  setNationalityData,
  setGenderData,
  Gender,
  Nationality,
} from './predictStore';
import { setHistory, Search } from '../../history/store/historyStore';
import { startLoading, stopLoading } from 'src/features/loading/loadingStore';
import { fetchNationalityApi, fetchGenderApi } from 'src/api/predict';
import { handleErrorSaga } from 'src/utils/handleErrorSaga';

export function* fetchDataSaga(action: PayloadAction<string>): SagaIterator {
  try {
    yield put(startLoading());
    const [nationality, gender]: [Nationality, Gender] = yield all([
      call(fetchNationalityApi, action.payload),
      yield call(fetchGenderApi, action.payload),
    ]);
    const hasFullInfo = nationality.country.length > 0 && gender.gender !== '';
    if (hasFullInfo) {
      const searchItem: Search = {
        id: Date.now(),
        name: nationality.name,
        gender: gender.gender,
        country: nationality.country[0].country_id,
      };
      yield put(setHistory(searchItem));
    } else {
      yield call(toastr.info, 'Information', 'There are no data for such name');
    }
    yield put(setGenderData(gender));
    yield put(setNationalityData(nationality));
  } catch (error) {
    yield call(handleErrorSaga, error);
  } finally {
    yield put(stopLoading());
  }
}
