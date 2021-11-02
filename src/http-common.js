/**
 * API URL
 * axio to connect/fetch data from the API
 *   */ 
import axios from "axios";
// config define the API url
import { API_BASE_URL } from './config'
export default axios.create({
  baseURL: API_BASE_URL,
});