import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
      <h1>Login Page</h1>
      <Link to="/signup">Sign Up</Link>
      <Link to="/userpage">Login</Link>
    </>
  );
};

export default Login;
