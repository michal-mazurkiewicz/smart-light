import axios from "axios";
import { FETCH_USER } from "./types";

export const fetchUser = () => async (dispatch) => {
  const res = await axios.get("/auth/current_user");
  dispatch({ type: FETCH_USER, authUser: res.data });
};
