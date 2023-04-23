import React, { useState } from "react";
import facebookWhite from "../../../../../common/images/facebookWhite.png";
import FacebookLogin from "@greatsumini/react-facebook-login";
import { useDispatch } from "react-redux";
import { signin } from "../../../../../common/redux/actions/user";
import useCart from "../../../../../common/hooks/useCart";

const FacebookSDK = () => {
  const dispatch = useDispatch<any>();
  const cart = useCart();
  const appId = "798751658511938";
  const [userRequest, setUserRequset] = useState<any>();

  const onProfileSuccess = (response: any) => {
    console.log(response);
    const req = {
      method: "oAuth",
      userEmail: response.email,
      userName: response.name,
      _id: response.id,
      userPictureUrl: response.picture.data.url,
      password: "fb",
      userCart: cart?.cart?._id,
    };
    response && setUserRequset(req);
    console.log(req);
  };
  userRequest && dispatch(signin(userRequest));

  return (
    <FacebookLogin
      appId={appId}
      onProfileSuccess={onProfileSuccess}
      initParams={{
        version: "v10.0",
        xfbml: true,
        cookie: false,
        localStorage: true,
      }}
      render={({ onClick }) => (
        <button
          style={{ backgroundColor: "#335795" }}
          className="sdkBtn"
          onClick={onClick}
        >
          <img src={facebookWhite} alt="" />
          Zaloguj z Facebook
        </button>
      )}
    />
  );
};

export default FacebookSDK;
