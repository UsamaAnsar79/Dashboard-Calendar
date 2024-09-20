

import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element: Element, ...rest }) => {
  // Check for user token
  const isAuthenticated = !!localStorage.getItem("userToken"); 

  return isAuthenticated ? <Element {...rest} /> : <Navigate to="/" />;
};

export default PrivateRoute;


