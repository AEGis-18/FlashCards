import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { Api } from "../api/base.api";
import { refresh } from "../api/tokens.api";
import axios from "axios";

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return authContext;
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAccess = async () => {
      try {
        console.log("Checking access cookies");
        const response = await axios.post(
          "http://localhost:8000/api/token/refresh/",
          {},
          { withCredentials: true }
        );
        console.log("fetch", response.data);
        setAuth({
          accessToken: response.data.access_token,
          username: response.data.user.username,
          email: response.data.user.email,
        });
      } catch (error) {
        console.log("Cookie is not valid: ", error);
        setAuth(null);
      } finally {
        setLoading(false);
      }
    };
    fetchAccess();
  }, []);

  useLayoutEffect(() => {
    const authInterceptor = Api.interceptors.request.use(
      (config) => {
        if (auth?.accessToken && !config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
    return () => {
      Api.interceptors.request.eject(authInterceptor);
    };
  }, [auth]);

  useLayoutEffect(() => {
    const refreshInterceptor = Api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error?.config;

        if (error?.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const response = await axios.post(
              "http://localhost:8000/api/token/refresh/",
              {},
              { withCredentials: true }
            );
            console.log("Interceptor data:", response.data);
            setAuth({
              accessToken: response.data.access_token,
              username: response.data.user.username,
              email: response.data.user.email,
            });

            originalRequest.headers.Authorization = `Bearer ${response.data.access_token}`;

            return Api(originalRequest);
          } catch (error) {
            console.log("Refresh request failed: ", error);

            setAuth(null);
          }
        }
        return Promise.reject(error);
      }
    );
    return () => {
      Api.interceptors.response.eject(refreshInterceptor);
    };
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
