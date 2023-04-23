import {
  CREATE_PRODUCT,
  FETCH_PRODUCT,
  FETCH_PRODUCTS,
  REMOVE_PRODUCT,
  EDIT_PRODUCT,
  CLEAN_PRODUCT,
  START_LOADING,
  STOP_LOADING,
} from "./actionTypes";
import * as api from "../api";

export const addProduct = (req) => async (dispatch) => {
  try {
    const { data } = await api.addProduct(req);
    dispatch({ type: CREATE_PRODUCT, data });
  } catch (error) {}
};

export const deleteProduct = (req) => async (dispatch) => {
  try {
    const { data } = await api.deleteProduct(req);
    dispatch({ type: REMOVE_PRODUCT, data });
  } catch (error) {}
};

export const editProduct = (req) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.editProduct(req);
    dispatch({ type: EDIT_PRODUCT, data });
    dispatch({ type: STOP_LOADING });
  } catch (error) {}
};

export const fetchProducts = (req) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchProducts(req);
    dispatch({ type: FETCH_PRODUCTS, data });
    dispatch({ type: STOP_LOADING });
  } catch (error) {}
};
export const fetchProduct = (req) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchProduct(req);
    dispatch({ type: FETCH_PRODUCT, data });
    dispatch({ type: STOP_LOADING });
  } catch (error) {}
};
export const cleanProduct = (req) => async (dispatch) => {
  try {
    dispatch({ type: CLEAN_PRODUCT });
  } catch (error) {
    console.log(error);
  }
};
