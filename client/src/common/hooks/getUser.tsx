import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { LOGOUT } from "../redux/actions/actionTypes";
import decode from "jwt-decode";
import { fetchUser } from "../redux/actions/user";

export default function getUser() {
  const dispatch = useDispatch<any>();
  const [userToken, setUserToken] = useState<any>(
    JSON.parse(localStorage.getItem("profile") as string)
  );
  const [isTokenExpired, setTokenExpired] = useState<boolean>(false);
  const { user } = useSelector((state: any) => state.user);
  useEffect(() => {
    if (!user && userToken !== null && !isTokenExpired)
      dispatch(fetchUser({ token: userToken }));
    const token = userToken;
    if (token) {
      const decodedToken: any = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        setTokenExpired(true);
        dispatch({ type: LOGOUT });
      }
    }
  }, []);

  return user;
}
