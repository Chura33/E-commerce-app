import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes, Switch } from "react-router-dom";
import store from "./store";

import NavBar from "./components/general/NavBar";

// Landing page components
import Background from "./components/landing/background";

import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <NavBar />
          <Routes>
            <Route exact path="/" Component={Background} />
            <Route exact path="/register" Component={Register} />
            <Route exact path="/login" Component={Login} />

          </Routes>
        </div>
      </Router>
      </Provider>
  );
};

export default App;
