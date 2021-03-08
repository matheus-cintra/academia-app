import axios, { AxiosInstance, AxiosResponse } from 'axios';

// const api = axios.create({
//   baseURL: 'http://localhost:4000',
// });

// export default api;

const href = window.location.href;

const URL = href.includes('localhost') ? 'http://localhost:4000' : 'https://atlantis-gym.herokuapp.com/';

const api: AxiosInstance = axios.create({
  baseURL: URL,
});

const getDBData = async (apiPath: string, params?: any): Promise<AxiosResponse> => {
  return await api.get(apiPath, { params });
};

const createDBData = async (apiPath: string, body?: any, params?: any): Promise<AxiosResponse> => {
  return await api.post(apiPath, body, { params });
};

const updateDBData = async (apiPath: string, body?: any, params?: any): Promise<AxiosResponse> => {
  return await api.put(apiPath, body, { params });
};

export { api, getDBData, createDBData, updateDBData };
