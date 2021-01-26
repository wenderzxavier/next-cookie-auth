import axios from "axios";
import Router from "next/router";

const WINDOW_USER_SCRIPT_VARIABLE = "__USER__";

axios.defaults.withCredentials = true;

export const loginUser = async (email, password) => {
  const { data } = await axios.post("/api/login", { email, password });
  if (typeof window !== "undefined") {
    window[WINDOW_USER_SCRIPT_VARIABLE] = data || {};
  }
};

export const getUserProfile = async () => {
  const { data } = await axios.get("/api/profile");
  return data;
};

export const getServerSideToken = (req) => {
  const { signedCookies = {} } = req || {};

  if (!signedCookies) {
    return {};
  } else if (!signedCookies.token) {
    return {};
  }

  return { user: signedCookies.token };
};

export const getClientSideToken = () => {
  if (typeof window !== "undefined") {
    const user = window[WINDOW_USER_SCRIPT_VARIABLE] || {};
    return { user };
  }

  return { user: {} };
};

export const logoutUser = async () => {
  if (typeof window !== "undefined") {
    window[WINDOW_USER_SCRIPT_VARIABLE] = {};
  }

  await axios.post("/api/logout");
  Router.push("/login");
};

export const getUserScript = (user) => {
  return `${WINDOW_USER_SCRIPT_VARIABLE} = ${JSON.stringify(user)}`;
};

export const authInitialProps = (data) => ({ req }) => {
  const auth = req ? getServerSideToken(req) : getClientSideToken();
  return { auth };
};
