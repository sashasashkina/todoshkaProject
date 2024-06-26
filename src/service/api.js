import axios from "axios";

const BASE_URL = "https://todoshka-back-5xf7.onrender.com/api/";

const $instance = axios.create({ baseURL: BASE_URL });

export const setAccessToken = (token) => {
  $instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAccessToken = () => {
  $instance.defaults.headers.common.Authorization = "";
};

export const register = async (params) => {
  const { data } = await $instance.post("users/register", params);
  // setToken(data.token);
  return data;
};

export const login = async (params) => {
  const { data } = await $instance.post("users/login", params);
  setAccessToken(res.data.accessToken);
  return data;
};

export const logout = async () => {
  const { data } = await $instance.post("users/logout");
  clearAccessToken();
  return data;
};

export const currentUser = async (params) => {
  const { data } = await $instance.get("users/current", params);
  const state = thunkAPI.getState();
  const persistedToken = state.auth.token;
  if (persistedToken === null) {
    return thunkAPI.rejectWithValue("Unable to fetch user");
  }
  setAccessToken(persistedToken);
  return data;
};

export const updateUser = async (params) => {
  const { data } = await $instance.put("users/update", params);
  return data;
};

export const changeTheme = async (params) => {
  const { data } = await $instance.patch("users/theme", params);
  clearAccessToken();
  return data;
};

//============================================================

export const getData = async () => {
  const { data } = await $instance.get("boards");
  return data;
};

export const addData = async (body) => {
  const { data } = await $instance.post("boards", body);
  return data;
};

export const editData = async (body) => {
  const { data } = await $instance.patch(`boards/${body.id}`, body);
  return data;
};

export const deleteData = async (id) => {
  const { data } = await $instance.delete(`boards/${id}`);
  return data;
};

//Это функция для EditProfile (Таня) не удалять!!!
export const axiosPrivateFormData = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
