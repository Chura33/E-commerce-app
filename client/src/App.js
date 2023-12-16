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
// import Landing from './components/landing';


// landing components
import Background from './components/landing/Background';
import ParentComponentForLogin from './components/general/ParentComponentForLogin';
import ParentComponentForRegister from './components/general/ParentComponent';
import Landing from './components/landing';
import ProtectedRoute from './components/general/ProtectedRoute';
import Dashboard from './components/dashboard';


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
        {/* <NavBar/> */}
        <Routes>
          <Route exact path='/' Component={Landing}/>
          <Route exact path='/register' Component={ParentComponentForRegister}/>
          <Route exact path='/login' Component={ParentComponentForLogin}/>
          <Route element={<ProtectedRoute/>}>
            <Route exact path = "/dashboard" Component={Dashboard}/>
          </Route>
        </Routes>
      </div>
    </Router>
    </Provider>
  );
}

export default App;
