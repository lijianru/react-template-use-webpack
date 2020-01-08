import * as React from "react";
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import Home from "Pages/Home";
import List from "./pages/List";

export default class App extends React.Component{
  render() {
    return (
      <BrowserRouter>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/list">List</Link></li>
        </ul>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/list">
            <List />
          </Route>
        </Switch>
      </BrowserRouter>
    )
  }
}
