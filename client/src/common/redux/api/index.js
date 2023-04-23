import axios from "axios";

const url = process.env.URL || "http://localhost:5000/";

const API = axios.create({ baseURL: url });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

//authentication
export const signIn = (userInput) => API.post("/api/user/signin", userInput);
export const signUp = (userInput) => API.post("/api/user/signup", userInput);
export const fetchUser = (token) => API.post("/api/user/fetchUser", token);
export const signInAdmin = (userInput) =>
  API.post("/api/owner/signin", userInput);
//categories
export const addCategory = (req) => API.post("/api/category", req);
export const removeCategory = (req) => API.post("/api/category", req);
export const fetchCategories = () => API.get("/api/category");
//subCategories
export const addSubCategory = (req) => API.post("/api/subCategory", req);
export const removeSubCategory = (req) => API.post("/api/subCategory", req);
export const fetchSubCategories = () => API.get("/api/subCategory");
//products
export const addProduct = (req) => API.post("/api/product/createProduct", req);
export const deleteProduct = (req) =>
  API.post("/api/product/deleteProduct", req);
export const fetchProducts = (req) =>
  API.get("/api/product/fetchProducts", req);
export const fetchProduct = (req) => API.post("/api/product/fetchProduct", req);
export const editProduct = (req) => API.post("/api/product/editProduct", req);
//cart
export const addProductToCart = (req) =>
  API.post("/api/cart/addProductToCart", req);
export const deleteProductFromCart = (req) =>
  API.post("/api/cart/deleteProductFromCart", req);
export const fetchCart = (req) => API.post("/api/cart/fetchCart", req);
export const editCart = (req) => API.update("/api/cart/editCart", req);
//store
export const updateStore = (req) => API.post("/api/store/updateStore", req);
