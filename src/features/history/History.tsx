import React from 'react';
import { useSelector } from 'react-redux';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { getHistory } from './store/historySelectors';
import style from './History.module.scss';

const columns = [
  {
    dataField: 'name',
    text: 'Name',
    sort: true,
  },
  {
    dataField: 'gender',
    text: 'Gender',
    sort: true,
  },
  {
    dataField: 'country',
    text: 'Country',
    sort: true,
  },
];

export const History = () => {
  const historyDate = useSelector(getHistory);

  return (
    <div className={style.wrapper}>
      <div className={style.title}>Historical Table</div>
      <div className={style.tableWrapper}>
        <BootstrapTable
          headerClasses={style.tableHeader}
          keyField='id'
          data={historyDate}
          columns={columns}
          striped
          hover
          condensed
        />
      </div>
    </div>
  );
};
