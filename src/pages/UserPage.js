import React from "react";
import { Link } from "react-router-dom";

const UserPage = () => {
  return (
    <>
      <div>
        Hello Welcome User
        <Link to="/">Log Out</Link> 
      </div>
    </>
  );
};

export default UserPage;