import axios from "./axios";

export const createSuppliersReportExcel = () => {
  return axios.get(`/reportSupplierExcel`);
};

export const createSuppliersReportPDF = () => {
  return axios.get(`/reportSupplierPDF`);
};
