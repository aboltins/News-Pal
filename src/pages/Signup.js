import React from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <>
      <h1>SignUp page</h1>
      <div>
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </>
  );
};

export default Signup;
