import React from 'react';
import ReduxToastr from 'react-redux-toastr';

import Router from './router';

import { Loading } from '../features/loading';

import { Header } from 'src/components';

import './App.css';

function App() {
  return (
    <div className='App'>
      <Loading />
      <ReduxToastr
        timeOut={4000}
        newestOnTop={false}
        preventDuplicates
        position='bottom-right'
        transitionIn='fadeIn'
        transitionOut='fadeOut'
        progressBar
        closeOnToastrClick
      />
      <Header />
      <Router />
    </div>
  );
}

export default App;
