import * as React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from 'Pages/Home'
import WrappedLoginForm from 'Pages/Login'
import CharacterList from 'Pages/Character'

export default function Routers(): React.ReactElement {
  return (
    <Switch>
      <Route path="/login">
        <WrappedLoginForm />
      </Route>
      <Route path="/character">
        <CharacterList />
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  )
}
