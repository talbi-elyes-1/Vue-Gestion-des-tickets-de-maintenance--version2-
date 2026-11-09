import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000'
});

// Récupérer tous les tickets
export const getTickets = async () => {
    const response = await api.get('/tickets');
    return response.data;
};

// Récupérer un ticket par son ID
export const getTicket = async (id) => {
    const response = await api.get(`/tickets/${id}`);
    return response.data;
};

// Créer un ticket
export const createTicket = async (data) => {
    const response = await api.post('/tickets', data);
    return response.data;
};

// Modifier un ticket
export const updateTicket = async (id, data) => {
    const response = await api.put(`/tickets/${id}`, data);
    return response.data;
};

// Supprimer un ticket
export const deleteTicket = async (id) => {
    const response = await api.delete(`/tickets/${id}`);
    return response.data;
};