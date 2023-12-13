import React, {useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes, Switch  } from 'react-router-dom';
import {Provider} from "react-redux";
import store from "./store"
// importing general components
import './App.css';
import NavBar from './components/general/NavBar';
// user components
import Register from './components/auth/Register';
import Login   from './components/auth/Login';
import setAuthToken from './util/setAuthToken';
import { setCurrentUser } from './actions/authActions';


// landing components
import Background from './components/landing/Background';
import ParentComponent from './components/general/ParentCommponent';

if (localStorage.token){
  setAuthToken(localStorage.token);
}
function App() {
  useEffect(()=>{
    store.dispatch(setCurrentUser())
  }, []);
  return (
    <Provider store={store}>
    <Router>
      <div className="App">
        <NavBar/>
        <Routes>
          <Route exact path='/' Component={Background}/>
          <Route exact path='/register' Component={ParentComponent}/>
          <Route exact path='/login' Component={Login}/>
        </Routes>
      </div>
    </Router>
    </Provider>
  );
}

export default App;
