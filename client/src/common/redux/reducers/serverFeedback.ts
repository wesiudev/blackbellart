import { USE_SERVER_FEEDBACK, CLEAR_SERVER_FEEDBACK } from "../actions/actionTypes";

const serverFeedbackReducer = (
  state = { text: null, id: null },
  action: { type: string; data: any }
) => {
  switch (action.type) {
    case USE_SERVER_FEEDBACK:
      return {
        ...state,
        text: action.data.text,
        id: action.data.id,
      };
    case CLEAR_SERVER_FEEDBACK:
      return {
        ...state,
        text: null,
        id: null,
      };
    default:
      return state;
  }
};

export default serverFeedbackReducer;
