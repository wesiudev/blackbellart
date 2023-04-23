import { AUTH, FETCH_USER, USE_SERVER_FEEDBACK } from "./actionTypes";
import * as api from "../api";
import { getServerFeedback } from "./serverFeedback";


interface UserInput {
  method: string;
  userEmail: string;
  userName: string;
  userPictureUrl: string;
  password?: string;
  _id?:string
  userCart?: string
}

export const signin =
  (userInput: UserInput) =>
  async (dispatch: (arg0: { type: string; data?: any }) => void) => {
    try {
      const { data } = await api.signIn(userInput);
      dispatch({ type: AUTH, data });
      // getServerFeedback(data)
    } catch (error: any) {

    }
  };


export const signup =
  (userInput: UserInput) =>
  async (dispatch: (arg0: { type: string; data?: any }) => void) => {
    try {
      const { data } = await api.signUp(userInput);
      dispatch({ type: AUTH, data });
    } catch (error: any) {

    }
  };

export const fetchUser =
  (token: any) =>
  async (dispatch: (arg0: { type: string; data?: any }) => void) => {
    try {
      const { data } = await api.fetchUser(token);
      dispatch({ type: FETCH_USER, data });
    } catch (error: any) {

    }
  };
