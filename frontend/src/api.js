import axios from 'axios';

// Set VITE_API_URL in Vercel env vars to your Render backend URL\nconst API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8090';

const api = axios.create({
  baseURL: `${API_BASE}/api/v1`,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

// Branch APIs
export const getBranches = () => api.get('/branches');
export const getBranch = (id) => api.get(`/branches/${id}`);
export const createBranch = (data) => api.post('/branches', data);
export const updateBranch = (id, data) => api.put(`/branches/${id}`, data);
export const deleteBranch = (id) => api.delete(`/branches/${id}`);

// Vehicle APIs
export const getVehicles = (params) => api.get('/vehicles', { params });
export const getVehicle = (id) => api.get(`/vehicles/${id}`);
export const getVehicleTypes = () => api.get('/vehicles/types');
export const addVehicle = (data) => api.post('/vehicles', data);
export const updateVehicle = (id, data) => api.put(`/vehicles/${id}`, data);
export const deleteVehicle = (id) => api.delete(`/vehicles/${id}`);

// Booking APIs
export const getBookings = () => api.get('/bookings');
export const getBooking = (id) => api.get(`/bookings/${id}`);
export const bookVehicle = (data) => api.post('/bookings', data);
export const cancelBooking = (id) => api.put(`/bookings/${id}/cancel`);
export const completeBooking = (id) => api.put(`/bookings/${id}/complete`);

// Dashboard APIs
export const getDashboardStats = () => api.get('/dashboard/stats');

export default api;
