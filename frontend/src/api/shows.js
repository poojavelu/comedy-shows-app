import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const showsAPI = {
  // Get all shows with optional filter
  getAllShows: (filter = null) => {
    const params = filter ? { filter } : {};
    return api.get("/shows/", { params });
  },

  // Get a single show by ID
  getShow: (id) => {
    return api.get(`/shows/${id}/`);
  },

  // Create a new show
  createShow: (data) => {
    return api.post("/shows/", data);
  },

  // Update a show
  updateShow: (id, data) => {
    return api.put(`/shows/${id}/`, data);
  },

  // Delete a show
  deleteShow: (id) => {
    return api.delete(`/shows/${id}/`);
  },
};

export default api;
