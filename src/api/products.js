import axios from "./axios";

export const getProductsRequest = (categoryId) => {
  return axios.get(`/products/${categoryId}`);
};

export const getProductRequest = (id) => {
  return axios.get(`/products/${id}`);
};
