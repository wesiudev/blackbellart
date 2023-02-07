import {
  ADD_CATEGORY,
  FETCH_CATEGORIES,
  REMOVE_CATEGORY,
} from "../actions/actionTypes";

const initialState = {
  categories: [],
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CATEGORY:
    case REMOVE_CATEGORY:
    case FETCH_CATEGORIES:
      return {
        ...state,
        categories: action.data,
      };
    default:
      return state;
  }
};

export default categoryReducer;
