import React from "react";
import "./App.css";
import { ProgressTab } from "../ProgressTab/ProgressTab";
import { Header } from "../Header/Header";
import { HabitList } from "../HabitList/HabitList";
import { PrivateRoute } from "../PrivateRoute/PrivateRoute";
import { LoginContainer } from "../../features/auth/login/LoginContainer";
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <Switch>
      <Route path="/login" exact>
        <div className="container" style={{ padding: 20 }}>
          <LoginContainer />
        </div>
      </Route>
      <PrivateRoute path="/">
        <div className="container" style={{ padding: 20 }}>
          <ProgressTab />
          <Header />
          <HabitList />
        </div>
      </PrivateRoute>
    </Switch>
  );
}

export default App;
