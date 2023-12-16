import React from 'react';
import { connect } from 'react-redux';
import { useLocation, Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ( {auth } ) => {
  const location = useLocation()

console.log(auth.isAuthenticated)
  return auth.isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

const mapStateToProps = (state)=>({
  auth: state.auth,
})
export default connect(mapStateToProps, )(ProtectedRoute);