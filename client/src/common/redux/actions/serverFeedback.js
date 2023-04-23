import { USE_SERVER_FEEDBACK } from "./actionTypes";

export const getServerFeedback = (data) => ({
  type: USE_SERVER_FEEDBACK,
  payload: data,
});
