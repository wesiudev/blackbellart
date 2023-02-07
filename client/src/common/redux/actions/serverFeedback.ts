import { CLEAR_SERVER_FEEDBACK, USE_SERVER_FEEDBACK } from "./actionTypes";

export const getServerFeedback = (text: string, id: string) => {
  return {
    type: USE_SERVER_FEEDBACK,
    data: { text, id },
  };
};

export const clearServerFeedback = () => {
  return {
    type: CLEAR_SERVER_FEEDBACK,
  };
};
