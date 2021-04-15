import { AxiosResponse } from 'axios';
import { api } from '../services/api';

const getData = async (API: string): Promise<AxiosResponse> => {
  return await api.get(API);
};

const getDataById = async (API: string, id: string): Promise<AxiosResponse> => {
  return await api.get(`${API}/${id}`);
};

export { getData, getDataById };
