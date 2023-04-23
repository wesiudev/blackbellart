import axios from "axios";
export const getLocale = () => async (dispatch) => {
  const { data } = await axios({
    method: "get",
    url: "http://localhost:5000",
  });
  dispatch({ type: "GET_LOCALE", data });
};
