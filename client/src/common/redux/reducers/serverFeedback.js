import {
  USE_SERVER_FEEDBACK,
  CLEAR_SERVER_FEEDBACK,
} from "../actions/actionTypes";

// id: CART / USER / ERROR

const initialState = { message: "", id: "" };

const serverFeedback = (state = initialState, action) => {
  switch (action.type) {
    case USE_SERVER_FEEDBACK:
      return {
        ...state,
        message: action.payload.feedback.message,
        id: action.payload.feedback.id,
      };
    case CLEAR_SERVER_FEEDBACK:
      return {
        ...state,
        message: "",
        id: "",
      };
    default:
      return state;
  }
};

export default serverFeedback;
