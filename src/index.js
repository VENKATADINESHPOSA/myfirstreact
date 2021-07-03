import React from "react";
import ReactDOM from "react-dom";
import PlayersSelection from "./Dream7";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import App from "./App";
import NotFound from "./NotFound";
import Player from "./Player";

const routing = (
  <Router>
    <h1>Games Site!</h1>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/dream7" component={PlayersSelection} />
      <Route path="/player/:id" component={Player} />
      <Route component={NotFound} />
    </Switch>
  </Router>
);

ReactDOM.render(
  <React.StrictMode>{routing}</React.StrictMode>,
  document.getElementById("root")
);
