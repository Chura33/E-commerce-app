import React from 'react';
import { BrowserRouter as Router, Route, Switch, Routes } from "react-router-dom";

import NavBar from "./components/general/NavBar";

import Background from './components/landing/background';

// Landing page components
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route exact path="/" components={Background} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
