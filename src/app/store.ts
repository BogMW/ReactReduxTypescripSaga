import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleWare from 'redux-saga';
import { reducer as toastrReducer } from 'react-redux-toastr';
import predictReducer from '../features/predict/store/predictStore';
import loadingReducer from '../features/loading/loadingStore';
import historyReducer from '../features/history/store/historyStore';
import rootSaga from './rootSaga';

const sagaMiddleWare = createSagaMiddleWare();

const localStorageMiddleware = (store: { getState: () => any }) => {
  return (next: (arg0: any) => any) => (action: any) => {
    const result = next(action);
    localStorage.setItem(
      'appHistory',
      JSON.stringify(store.getState().history)
    );
    return result;
  };
};

export const store = configureStore({
  reducer: {
    predict: predictReducer,
    loading: loadingReducer,
    history: historyReducer,
    toastr: toastrReducer,
  },

  middleware: [sagaMiddleWare, localStorageMiddleware],
});

export type RootState = ReturnType<typeof store.getState>;

sagaMiddleWare.run(rootSaga);
