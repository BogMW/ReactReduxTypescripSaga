import React, { useState, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { get } from 'lodash';
import { fetchData, resetData } from '../predict/store/predictStore';
import { getNationality, getGender } from './store/predictSelectors';
import styles from './Predict.module.scss';

export function Predict() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');

  const nationalityData = useSelector(getNationality);
  const genderData = useSelector(getGender);

  const countryName = useMemo(
    () => get(nationalityData, 'country[0].country_id', ''),
    [nationalityData]
  );

  const isDataExist = useMemo(
    () => countryName !== '' && genderData.gender !== '',
    [countryName, genderData]
  );

  const nameInfo = useMemo(
    () =>
      `${nationalityData.name} is a ${genderData.gender} name from ${countryName}`,
    [nationalityData, genderData, countryName]
  );

  const dispatchData = useCallback(
    (firstName): void => {
      dispatch(fetchData(firstName));
    },
    [dispatch]
  );

  const resetDataDispatch = useCallback((): void => {
    dispatch(resetData());
  }, [dispatch]);

  const handleChangeName = useCallback((e): void => {
    setName(e.target.value);
  }, []);

  const handleSearch = useCallback(
    (e): void => {
      dispatchData(name);
      setName('');
    },
    [dispatchData, setName, name]
  );

  const handleSearchAnother = useCallback((): void => {
    resetDataDispatch();
  }, [resetDataDispatch]);

  const search = (
    <>
      <div className={styles.inputWrapper}>
        <label className={styles.label} htmlFor='name'>
          Enter Name:
        </label>
        <input
          value={name}
          className={styles.input}
          onChange={handleChangeName}
          type='text'
          name='name'
          id='name'
        />
      </div>
      <div className={styles.submit} onClick={handleSearch}>
        <span>Submit</span>
      </div>
    </>
  );

  const result = (
    <>
      <div className={styles.inputWrapper}>
        <div className={styles.label}>
          You entered: <span>{nationalityData.name}</span>
        </div>
      </div>
      <div className={styles.inputWrapper}>
        <div className={styles.label}>
          Description: <span>{nameInfo}</span>
        </div>
      </div>
      <div className={styles.submit} onClick={handleSearchAnother}>
        <span>Enter Another Name</span>
      </div>
    </>
  );

  return <div className={styles.wrapper}>{isDataExist ? result : search}</div>;
}
