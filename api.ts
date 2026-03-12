import axios from "axios";

const API = "http://localhost:5000/api";

export const getDonors = () => axios.get(`${API}/donors`);
export const addDonor = (data:any) => axios.post(`${API}/donors`, data);

export const getRequests = () => axios.get(`${API}/requests`);
export const addRequest = (data:any) => axios.post(`${API}/requests`, data);