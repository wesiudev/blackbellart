import { combineReducers } from "redux";

import auth from "./auth";
import categories from "./categories";
import subCategories from "./subCategories";
import serverFeedback from "./serverFeedback";
import products from "./products";
import cart from "./cart";
export const reducers = combineReducers({
  auth,
  categories,
  subCategories,
  serverFeedback,
  products,
  cart,
});
