import { all, fork } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { watchPredictSagas } from 'src/features/predict/store';

export default function* rootSaga(): SagaIterator {
  yield all([fork(watchPredictSagas)]);
}
