const initialState = {
  language: "",
};

const localeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_LOCALE":
      return {
        ...state,
        language: action.data.language,
      };
    default:
      return state;
  }
};

export default localeReducer;
