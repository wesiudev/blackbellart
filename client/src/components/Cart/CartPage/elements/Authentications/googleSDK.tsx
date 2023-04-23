import React, { useState } from "react";
import googleImage from "../../../../../common/images/googleSDK.png";
import { useDispatch } from "react-redux";
import { auth, provider } from "./googleConfig/config";
import useCart from "../../../../../common/hooks/useCart";
import { signin } from "../../../../../common/redux/actions/user";
import { signInWithPopup } from "firebase/auth";

const GoogleSDK = () => {
  const dispatch = useDispatch<any>();
  const cart = useCart();

  // userRequest && dispatch(signin(userRequest));

  const SignInWithGoogle = () => {
    signInWithPopup(auth, provider).then((res) => {
      const req = {
        method: "oAuth",
        userEmail: res.user.email!,
        userName: res.user.displayName!,
        _id: res.user.uid!,
        userPictureUrl: res.user.photoURL!,
        password: "placeholder",
        userCart: cart?.cart?._id!,
      };
      req && dispatch(signin(req));
    });
  };
  return (
    <>
      <button
        style={{ backgroundColor: "#dd4b39" }}
        className="sdkBtn"
        onClick={() => SignInWithGoogle()}
      >
        <img src={googleImage} alt="" />
        Zaloguj przez Google
      </button>
    </>
  );
};

export default GoogleSDK;
