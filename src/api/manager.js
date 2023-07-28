import axios from "axios";

/**
 * Create an Axios Client with defaults
 */
const axiosClient = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  timeout: 30000,
});

const Api = async (
  config = { method: "GET", data: {}, params: {}, url: "" },
  shouldAppendToken = true,
  customToken = null
) => {
  // Success
  const onSuccess = (response) => {
    return Promise.resolve(response?.data);
  };

  // Error
  const onError = (error) => {
    if (error?.response) {
      // Request was made but server responded with something
      // other than 2xx
      return Promise.reject(error?.response?.data);
    } else {
      // Something else happened while setting up the request
      // triggered the error
      return Promise.reject(error?.message);
    }
  };

  // Append headers
  // const [cookies, setCookies] = useCookies(["token"]);
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOTExNGVhZTgxMzA5YWU0MWNkZDk0Yjc2YTg5OTE3OCIsInN1YiI6IjY0YzExOWJmNjA2MjBhMDBlNDgwYmJmZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8zmLsB6W0l29CTX8BSe7gL8Tl3aX3C7TGjU415Fr_Ls",
  };

  // Set headers
  axiosClient.defaults.headers = headers;

  return axiosClient(config).then(onSuccess).catch(onError);
};

export default Api;
