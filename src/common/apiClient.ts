/* eslint-disable */
import { AxiosRequestConfig } from 'axios';
import { SagaIterator } from 'redux-saga';
import { call, cancelled } from 'redux-saga/effects';
import axios, { CancelToken } from '../app/axios';
import { DataModificationPayload } from './types';

interface Get {
  <T = any | null, R = T>(
    url: string,
    urlParams?: any,
    config?: AxiosRequestConfig
  ): SagaIterator<R>;
}
interface Post {
  <T = any | null, R = T>(
    url: string,
    data?: DataModificationPayload | FormData | any,
    config?: AxiosRequestConfig
  ): SagaIterator<R>;
}

export function* request(config: AxiosRequestConfig = {}): SagaIterator {
  const source = CancelToken.source();
  try {
    const result = yield call(axios.request, {
      cancelToken: source.token,
      ...config,
    });
    return result.data;
  } finally {
    if (yield cancelled()) {
      source.cancel();
    }
  }
}

const get: Get = (
  url: string,
  urlParams: any = {},
  config: AxiosRequestConfig = {}
) => {
  return request({
    method: 'get',
    url: url,
    params: { ...urlParams },
    ...config,
  });
};
const post: Post = (url: string, config: AxiosRequestConfig = {}) => {
  return request({
    method: 'post',
    url: url,
    ...config,
  });
};

export interface Client {
  get: Get;
  post: Post;
}

const apiClient = {
  get: (url: string, urlParams?: any, optionalConfig?: AxiosRequestConfig) =>
    get(url, urlParams, optionalConfig),
  post: (url: string, data: DataModificationPayload, optionalConfig = {}) =>
    post(url, data, optionalConfig),
};

export default apiClient;
