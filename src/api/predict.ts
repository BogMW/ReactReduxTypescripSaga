import { SagaIterator } from 'redux-saga';
import { Nationality } from '../features/predict/store/predictStore';
import apiClient from '../common/apiClient';

export function fetchNationalityApi(
  payload: string
): SagaIterator<Nationality> {
  return apiClient.get(`https://api.nationalize.io/?name=${payload}`);
}

export function fetchGenderApi(payload: string): SagaIterator {
  return apiClient.get(`https://api.genderize.io/?name=${payload}`);
}
