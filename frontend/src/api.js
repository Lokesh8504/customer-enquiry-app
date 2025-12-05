import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api";

export async function fetchEnquiries(page = 1, q = "") {
  const params = {};
  if (page) params.page = page;
  if (q) params.q = q;

  const response = await axios.get(`${API_BASE_URL}/enquiries/`, { params });
  return response.data; // { count, next, previous, results: [...] }
}

export async function createEnquiry(enquiry) {
  const response = await axios.post(`${API_BASE_URL}/enquiries/`, enquiry);
  return response.data;
}

export async function deleteEnquiry(id) {
  await axios.delete(`${API_BASE_URL}/enquiries/${id}/`);
}
