import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
})

export const getAllEmployees = async () => {
    return await api.get('/employees').then(response => response.data);
}

export const getEmployeeById = async (id) => {
    return await api.get(`/employee/${id}`).then(response => response.data);
}

export const getDesks = async () => {
    return await api.get('/desks').then(response => response.data);
}

export const updateDesk = async (id, desk) => {
    return await api.put(`/desk/${id}`, desk).then(response => response.data);
}

const apis = {
    getAllEmployees,
    getEmployeeById,
    getDesks,
    updateDesk
}

export default apis