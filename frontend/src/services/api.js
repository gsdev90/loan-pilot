import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api/',
});

export const getLoans = () => api.get('/loans/');
export const createLoan = (loanData) => api.post('/loans/', loanData);
export const updateLoanStatus = (id, status) => api.patch(`/loans/${id}/`, { status });