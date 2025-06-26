import fetchWrapper from "../../api";
import { SET_USER_DETAILS } from "./authActions";

export const userLogin = (username, password) => {
  return async (dispatch, getState) => {
    const result: any = await fetchWrapper("/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const { error, data, ok } = result;

    if (error || !ok)
      return dispatch({
        type: SET_USER_DETAILS,
        payload: {
          ...getState().auth,
          error: data?.message || "Something went wrong!",
        },
      });

    dispatch({
      type: SET_USER_DETAILS,
      payload: { ...result.data, isAuthenticated: true, error: "" },
    });
  };
};
