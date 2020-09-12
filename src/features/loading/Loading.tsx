import React from 'react';
import { useSelector } from 'react-redux';

import { getIsLoading } from './loadingSelectors';
import Loader from 'react-loader-spinner';
import styles from './Loading.module.scss';

export const Loading = () => {
  const isLoading = useSelector(getIsLoading);
  return isLoading ? (
    <div className={styles.loading}>
      <Loader type='Bars' color='#00BFFF' height={100} width={100} />
    </div>
  ) : null;
};
