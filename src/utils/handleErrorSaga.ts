import { call } from '@redux-saga/core/effects';
import { AxiosError } from 'axios';
import { toastr } from 'react-redux-toastr';

export function* handleErrorSaga(error: AxiosError) {
  console.error(error);
  yield call(toastr.error, 'Server error', error.message);
}
