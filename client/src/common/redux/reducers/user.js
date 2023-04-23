import { AUTH, FETCH_USER, LOGOUT, OWNER_AUTH } from "../actions/actionTypes";

const initialState = {
  user: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem("profile", JSON.stringify(action.data.token));
    case FETCH_USER:
      return {
        ...state,
        user: action.data.result,
      };
    case OWNER_AUTH:
      localStorage.setItem("owner", JSON.stringify(action.data.result));
      return {
        ...state,
        user: action.data.result,
      };
    case LOGOUT:
      localStorage.removeItem("profile");
      localStorage.removeItem("owner");
      return { ...state, user: null };
    default:
      return state;
  }
};

export default authReducer;
