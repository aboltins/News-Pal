import React, { useEffect, useState } from "react";
import { useUserAuth } from "../components/UserAuthContext";
import db from "../config/Firebase";
import { onSnapshot, collection, query, where } from "firebase/firestore";
import { Link } from "react-router-dom";

function UserNewsFeed() {
  const { user } = useUserAuth();
  let name;
  const [pref, setPref] = useState([]);
  const colletionRef = collection(db, "User_News_Prefrences");

  if (user.displayName === null) {
    name = "NewsPal User";
  } else {
    name = user.displayName;
  }

  useEffect(() => {
    const id = user ? user.uid : "unknown";
    const q = query(colletionRef, where("owner", "==", id));
    const unsub = onSnapshot(q, (querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setPref(items);
    });
    return () => {
      unsub();
    };
  }, []);

  let userPreferences = [];
  if (pref.length > 0) {
    userPreferences = pref[0].userPref;
    console.log(userPreferences);
  }

  return (
    <>
      <h1>{name}'s News Feed</h1>
      <ul>
        News Preferences:
        {userPreferences.map((d) => (
          <li key={d}>{d}</li>
        ))}
      </ul>
      <Link to="/">Log Out</Link>
    </>
  );
}
export default UserNewsFeed;
