import { useEffect } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const UserNav = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const navigate = useNavigate();

  useEffect(() => {
  if (user.metadata.creationTime === user.metadata.lastSignInTime) {
    return navigate("/userpreferences");
  } else {
    return navigate("/userprofile");
  }
}, []);
};

export default UserNav;
