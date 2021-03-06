import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { withAuth } from "./components/Auth";
import App from "./App";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Preferences from "./pages/Preferences";
import Devices from "./pages/Devices";
import Dashboard from "./pages/Dashboard";
import News from "./pages/News";

const Routes = () => (
  <Router>
    <Switch>
      <App>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/login" component={Login} />
        <Route path="/device" component={Devices} />
        <Route path="/register" component={Register} />
        <Route path="/news/:id" component={News} />
        <Route path="/dashboard" component={withAuth(Dashboard)} />
        <Route path="/preferences" component={withAuth(Preferences)} />
      </App>
    </Switch>
  </Router>
);

export default Routes;
