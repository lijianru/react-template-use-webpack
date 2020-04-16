import React, { ReactElement } from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from 'pages/Home';
import LoginPage from 'pages/Login';

export default function Routers(): ReactElement {
  return (
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/login" exact>
        <LoginPage />
      </Route>
    </Switch>
  );
}
