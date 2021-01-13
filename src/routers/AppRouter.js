import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { loginUser } from "../store/actions/auth";
import AuthRouter from "./AuthRouter";
import { Dashboard } from "./Dashboard";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

export default function AppRouter() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const isLogin = JSON.parse(localStorage.getItem("user"));

    if (isLogin) dispatch(loginUser(isLogin));
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Switch>
          <PublicRoute
            path="/auth"
            isLogin={user}
            component={AuthRouter}
          ></PublicRoute>

          <PrivateRoute
            path="/"
            isLogin={user}
            component={Dashboard}
          ></PrivateRoute>
        </Switch>
      </div>
    </Router>
  );
}
