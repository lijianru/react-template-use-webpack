import * as React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from 'Pages/Home'
import WrappedLoginForm from 'Pages/Login'

export default function Routers() {
  return (
    <Switch>
      <Route path="/login">
        <WrappedLoginForm />
      </Route>
      <Route path="/users">
        <Users />
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  )
}

function Users() {
  return <h2>Users</h2>
}
