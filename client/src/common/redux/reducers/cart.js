import {
  DELETE_PRODUCT_FROM_CART,
  FETCH_CART,
  ADD_PRODUCT_TO_CART,
} from "../actions/actionTypes";

const initialState = {
  cart: localStorage.getItem("blackbellcart"),
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT_TO_CART:
      localStorage.setItem("blackbellcart", JSON.stringify(action.data));
      return {
        ...state,
        cart: action.data.cart,
      };
    case FETCH_CART:
      return {
        ...state,
        cart: action.data,
      };
    case DELETE_PRODUCT_FROM_CART:
      localStorage.setItem("blackbellcart", JSON.stringify(action.data));
      return {
        ...state,
        cart: action.data,
      };
    default:
      return state;
  }
};

export default cartReducer;
