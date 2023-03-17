import React, {useState} from "react";
import { Link } from "react-router-dom";
import { useUserAuth } from "../components/UserAuthContext";
import { getAuth, updateProfile } from "firebase/auth";


const UserPage = () => {
  const { user } = useUserAuth();
  console.log(user.displayName);
  let photo; let name;
  if (user.photoURL === null ) {
    photo = 'https://static.hudl.com/users/prod/5499830_8e273ea3a64448478f1bb0af5152a4c7.jpg'
  } else {
    photo = user.photoURL
  }

  if (user.displayName === null ) {
      name = 'NewsPal User'
  } else {
    name = user.displayName
  }

const auth = getAuth();
updateProfile(auth.currentUser, {
 displayName: name, photoURL: photo
}).then(() => {
  console.log('profile updated');
}).catch((error) => {
  console.log(error);
});

  return (
    <>
      <div>
        Hello Welcome {name}
        <img src={photo}></img>
        <br/>
        <Link to="/">Log Out</Link> 
      </div>
    </>
  );
};

export default UserPage;