import api from './api';

const eventService = {
  getAllEvents: async (filters = {}) => {
    const params = new URLSearchParams(filters).toString();
    const response = await api.get(`/events?${params}`);
    return response.data;
  },

  getEvent: async (id) => {
    const response = await api.get(`/events/${id}`);
    return response.data;
  },

  createEvent: async (eventData) => {
    const response = await api.post('/events', eventData);
    return response.data;
  },

  updateEvent: async (id, eventData) => {
    const response = await api.put(`/events/${id}`, eventData);
    return response.data;
  },

  deleteEvent: async (id) => {
    const response = await api.delete(`/events/${id}`);
    return response.data;
  },

  registerForEvent: async (id) => {
    const response = await api.post(`/events/${id}/register`);
    return response.data;
  },

  unregisterFromEvent: async (id) => {
    const response = await api.delete(`/events/${id}/register`);
    return response.data;
  },
};

export default eventService;