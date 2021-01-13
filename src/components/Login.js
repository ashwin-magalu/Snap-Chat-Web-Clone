import React from "react";
import "./Login.css";
import { useDispatch } from "react-redux";
import { Button } from "@material-ui/core";
import { auth, provider, persistence } from "../config/firebase";
import { login } from "../config/appSlice";

const Login = () => {
  const dispatch = useDispatch();

  const signIn = async () => {
    await auth
      .setPersistence(persistence)
      .then(async () => {
        await auth
          .signInWithPopup(provider)
          .then((res) => {
            dispatch(
              login({
                userName: res.user.displayName,
                profilePic: res.user.photoURL,
                id: res.user.uid,
              })
            );
          })
          .catch((err) => {
            alert(err.message);
          });
      })
      .catch(function (error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <div className="login">
      <div className="login__container">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeNzQYiICDUTiJCgI_4ZuWb8rR3_HW72q7pA&usqp=CAU"
          alt=""
        />
        <Button variant="outlined" onClick={signIn}>
          Sign In
        </Button>
      </div>
    </div>
  );
};

export default Login;
