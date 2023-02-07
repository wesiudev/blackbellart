import { AUTH, USE_SERVER_FEEDBACK, OWNER_AUTH } from "./actionTypes";
import * as api from "../api/";
import { clearServerFeedback, getServerFeedback } from "./serverFeedback";

interface UserInput {
  userName:string
  password:string
}

export const signin =
  (userInput: UserInput) =>
  async (dispatch: (arg0: { type: string; data?: any }) => void) => {
    try {
      const { data } = await api.signIn(userInput);
      dispatch({ type: AUTH, data });
    } catch (error: any) {
      dispatch(getServerFeedback(error?.response?.data?.msg, USE_SERVER_FEEDBACK));
      setTimeout(() => {
        dispatch(clearServerFeedback());
      }, 5000);
    }
  };

export const signup =
  (userInput: UserInput) =>
  async (dispatch: (arg0: { type: string; data?: any }) => void) => {
    try {
      const { data } = await api.signUp(userInput);
      dispatch({ type: AUTH, data });
    } catch (error: any) {
      dispatch(getServerFeedback(error?.response?.data?.msg, USE_SERVER_FEEDBACK));
      setTimeout(() => {
        dispatch(clearServerFeedback());
      }, 5000);
    }
  };

export const signInAdmin =
  (userInput: UserInput) =>
  async (dispatch: (arg0: { type: string; data?: any }) => void) => {
    try {
      const { data } = await api.signInAdmin(userInput);
      dispatch({ type: OWNER_AUTH, data });
    } catch (error: any) {
      dispatch(getServerFeedback(error?.response?.data?.msg, USE_SERVER_FEEDBACK));
      setTimeout(() => {
        dispatch(clearServerFeedback());
      }, 5000);
    }
  };
  