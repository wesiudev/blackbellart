import { USE_SERVER_FEEDBACK, ADD_PRODUCT_TO_CART, FETCH_CART, DELETE_PRODUCT_FROM_CART } from "./actionTypes";
import * as api from "../api";
import { clearServerFeedback, getServerFeedback } from "./serverFeedback";

interface ICart {
  productID: string
  isOriginal: boolean
  size: string
  cartID: string
  quantity: number
}

export const addProductToCart =
  (cart: ICart) =>
  async (dispatch: (arg0: { type: string; data?: any }) => void) => {
    try {
      const { data } = await api.addProductToCart(cart);
      dispatch({ type: ADD_PRODUCT_TO_CART, data });
      dispatch({ type: FETCH_CART, data });
    } catch (error: any) {
      dispatch(getServerFeedback(error?.response?.data?.msg, USE_SERVER_FEEDBACK));
      setTimeout(() => {
        dispatch(clearServerFeedback());
      }, 5000);
    }
  };
export const fetchCart =
  (cartID: any) =>
  async (dispatch: (arg0: { type: string; data?: any }) => void) => {
    try {
      const { data } = await api.fetchCart(cartID);
      dispatch({ type: FETCH_CART, data });
    } catch (error: any) {
      dispatch(getServerFeedback(error?.response?.data?.msg, USE_SERVER_FEEDBACK));
      setTimeout(() => {
        dispatch(clearServerFeedback());
      }, 5000);
    }
  };
export const deleteProductFromCart =
  (cart: ICart) =>
  async (dispatch: (arg0: { type: string; data?: any }) => void) => {
    try {
      const { data } = await api.deleteProductFromCart(cart);
      dispatch({ type: DELETE_PRODUCT_FROM_CART, data });
    } catch (error: any) {
      dispatch(getServerFeedback(error?.response?.data?.msg, USE_SERVER_FEEDBACK));
      setTimeout(() => {
        dispatch(clearServerFeedback());
      }, 5000);
    }
  };
