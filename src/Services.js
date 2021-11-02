/**
 *  all the http routes
 *  (GET, POST)
 */

import http from "./http-common";
/**
 * getting all the data from the API
 * @returns 
 */
const getAll = () => {
  return http.get("/results");
};

/**
 * input the url data
 * @param {*} urldata 
 * @returns 
 */
const create = urldata => {

  return http.post("/url", {urldata:urldata});
};

 

export default {
  getAll,
  
  create,
   
};

