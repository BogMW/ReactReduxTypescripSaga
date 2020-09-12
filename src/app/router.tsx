// Core
import React from 'react';
import {
  Switch,
  Route,
  Redirect,
  withRouter,
  useLocation,
} from 'react-router-dom';

// Pages
import { Predict } from 'src/features/predict';
import { History } from 'src/features/history';

export const Router: React.FC = () => {
  const location = useLocation();
  console.dir(location);
  return (
    <Switch location={location}>
      <Route path={'/predict'} exact component={Predict} />
      <Route path={'/history'} exact component={History} />
      <Redirect to={'/predict'} />
    </Switch>
  );
};

export default withRouter(Router);
