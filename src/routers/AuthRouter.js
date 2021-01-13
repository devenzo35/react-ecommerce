import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Login } from "../components/auth/Login";
import { Register } from "../components/auth/Register";

export default function AuthRouter() {
  return (
    <Router>
      <div>
        <Switch>

          <Route path="/auth/login" component={Login}></Route>

          <Route path="/auth/register" component={Register}></Route>

          <Redirect to="/auth/login"></Redirect>

        </Switch>
      </div>
    </Router>
  );
}
