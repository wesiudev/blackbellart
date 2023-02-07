import {
  CREATE_PRODUCT,
  EDIT_PRODUCT,
  FETCH_PRODUCT,
  FETCH_PRODUCTS,
  REMOVE_PRODUCT,
  CLEAN_PRODUCT,
  START_LOADING,
  STOP_LOADING,
} from "../actions/actionTypes";

const initialState = {
  products: [],
  product: {},
  fetching: false,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PRODUCT:
    case REMOVE_PRODUCT:
    case FETCH_PRODUCTS:
      return {
        ...state,
        products: action.data,
      };
    case FETCH_PRODUCT:
      return {
        ...state,
        product: action.data,
      };
    case EDIT_PRODUCT:
      return {
        ...state,
        product: action.data.updatedProduct,
      };
    case CLEAN_PRODUCT:
      return {
        ...state,
        product: {},
      };
    case START_LOADING:
      return {
        ...state,
        fetching: true,
      };
    case STOP_LOADING:
      return {
        ...state,
        fetching: false,
      };
    default:
      return state;
  }
};

export default productReducer;
