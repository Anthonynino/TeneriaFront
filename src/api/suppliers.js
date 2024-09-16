import axios from "./axios";

export const getAllSuppliers = () => {
  return axios.get(`/suppliers`);
};

export const addSuppliersRequest = (name, rif, ubication, isNational) => {
  return axios.post(`/createSupplier`, { name, rif, ubication, isNational });
};
