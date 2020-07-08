import axios, { AxiosRequestConfig, AxiosInstance } from 'axios';

const API_BASE_URL = 'https://slack.com/api';

/**
 * Creates a base axios instance
 */
const api = axios.create({
  baseURL: 'https://slack.com/api',
});

/**
 * Creates a modifiable axios instance
 * @param baseURL The base URL the network request will be sent
 * @param headers Could be any passable header values
 */
export const apiConfig = ({
  baseURL = API_BASE_URL, headers,
}: AxiosRequestConfig): AxiosInstance => axios.create({
  baseURL,
  headers,
});

export default api;
