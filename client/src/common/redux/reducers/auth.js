import { AUTH, LOGOUT, OWNER_AUTH } from "../actions/actionTypes";

const initialState = {
  authData: localStorage.getItem("profile"),
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem("profile", JSON.stringify(action.data));
      return {
        ...state,
        authData: action.data,
      };
    case OWNER_AUTH:
      localStorage.setItem("profile", JSON.stringify(action.data));
      return {
        ...state,
        authData: action.data,
      };
    case LOGOUT:
      localStorage.removeItem("profile");
      return { ...state, authData: null };
    default:
      return state;
  }
};

export default authReducer;
