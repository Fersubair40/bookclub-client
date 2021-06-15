import axios from "axios";
import { BASE_URL } from "../config/index";

axios.defaults.baseURL = `${BASE_URL}`;
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers["Content-Type"] = "application/json";

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error.response);
  }
);

const Api = {
  isLoggedIn: async () => {
    const authToken = await Api.getToken();
    return authToken && authToken !== undefined && authToken !== ""
      ? true
      : false;
  },
  authenticate: async (data) => {
    try {
      const response = await axios.post("/authenticate", JSON.stringify(data));
      if (response && response.status === 200) {
        await Api.setToken(response.data.token);
        return response;
      }
    } catch (error) {
      return error;
    }
  },
  getAllBooks: async () => {
    try {
      const response = await axios.get("/books");
      if (response && response.status === 200) {
        return response;
      }
    } catch (error) {
      return error;
    }
  },
  getOneBook: async (id) => {
    try {
      const response = await axios.get(`/books/${id}`);
      if (response && response.status === 200) {
        return response;
      }
    } catch (err) {
      return err;
    }
  },
  getBooksComment: async (bookId) => {
    try {
      const response = await axios.get(`/comments/${bookId}`);
      if (response && response.status === 200) {
        return response;
      }
    } catch (error) {
      return error;
    }
  },
  addComment: async (data) => {
    await Api.setAuthToken();
    try {
      const response = await axios.post("/comments", JSON.stringify(data));
      if (response && response.status === 200) {
        return response;
      }
    } catch (error) {
      return error;
    }
  },
  isSignedIn: async () => {
    await Api.setAuthToken();
    try {
      const response = await axios.get("/is-signed-in");
      if (response && response.status === 200) {
        return response;
      }
    } catch (error) {
      return error;
    }
  },
  deleteComment: async (commentId) =>{
    await Api.setAuthToken();
    try {
      const response = await axios.delete(`/comments/${commentId}`)
      if (response && response.status === 204) {
        return response
      }
    } catch (error) {
      return error;
    }
  },
  logOut: async () => {
    await Api.removeToken();
    const authToken = await localStorage.getItem("auth_token");
    return authToken;
  },
  setAuthToken: async () => {
    axios.defaults.headers["Authorization"] = await Api.getToken();
  },
  setToken: async (token) => {
    await localStorage.setItem("authToken", token);
  },
  getToken: async () => {
    const authToken = await localStorage.getItem("authToken");
    return authToken;
  },
  removeToken: async () => {
    await localStorage.removeItem("authToken");
  },
};

export default Api;
