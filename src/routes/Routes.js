import PlayersSelection from "../pages/Dream7/Dream7Hooks";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import App from "../App";
import NotFound from "../pages/NotFound/NotFound";
import Player from "../pages/Player/Player";

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/dream7" component={PlayersSelection} />
      <Route path="/player/:id" component={Player} />
      <Route component={NotFound} />
    </Switch>
  </Router>
);

export default Routes;
