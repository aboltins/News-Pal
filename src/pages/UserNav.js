import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../components/UserAuthContext";
import { onSnapshot, collection, query, where } from "firebase/firestore";
import db from "../config/Firebase";

const UserNav = () => {
  const { user } = useUserAuth();
  const colletionRef = collection(db, "User_News_Prefrences");
  const navigate = useNavigate();

  useEffect(() => {
    const id = user ? user.uid : "unknown";
    console.log(id);
    const q = query(colletionRef, where("id", "==", id));
    const unsub = onSnapshot(q, (querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      if (items.length == 0) {
        return navigate("/userpreferences");
      } else {
        return navigate("/userprofile");
      }
    });
    return () => {
      unsub();
    };
  }, []);
};

export default UserNav;
