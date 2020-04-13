import React, { ReactElement } from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from 'pages/Home';
import LoginPage from 'pages/Login';
import CharacterList from 'pages/Character';

export default function Routers(): ReactElement {
  return (
    <Switch>
      <Route path="/login">
        <LoginPage />
      </Route>
      <Route path="/character">
        <CharacterList />
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  );
}
