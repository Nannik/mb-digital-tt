import axios from "axios";
import { API_HOST } from 'env';

export const api = axios.create({
  baseURL: API_HOST,
})
