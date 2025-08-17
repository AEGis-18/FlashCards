import { Api } from "./base.api";

const LOGIN_URL = "token/";
const REFRESH_URL = "token/refresh/";

export const login = (username, password) => {
  return Api.post(LOGIN_URL, { username: username, password: password });
};

export const refresh = () => {
  return Api.post(REFRESH_URL, {});
};
