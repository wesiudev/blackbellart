import {
  ADD_SUBCATEGORY,
  FETCH_SUBCATEGORIES,
  REMOVE_SUBCATEGORY,
} from "../actions/actionTypes";

const initialState = {
  subCategories: [],
};

const subCategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_SUBCATEGORY:
    case REMOVE_SUBCATEGORY:
    case FETCH_SUBCATEGORIES:
      return {
        ...state,
        subCategories: action.data,
      };
    default:
      return state;
  }
};

export default subCategoryReducer;
