import { combineReducers } from "redux";

import user from "./user";
import categories from "./categories";
import subCategories from "./subCategories";
import serverFeedback from "./serverFeedback";
import products from "./products";
import cart from "./cart";
import listOfCountries from "./static/listOfcountries";
import locale from "./static/locale";
export const reducers = combineReducers({
  user,
  categories,
  subCategories,
  serverFeedback,
  products,
  cart,
  listOfCountries,
  locale,
});
