import axios from 'axios';

export const getTasks = (id) => axios.get('/api/nv/testsuits', { params: { project_id: id } });

export const createTask = (data, id) => axios.post('/api/nv/testsuits', data, { params: { project_id: id } });

export const updateTask = (data, id) => axios.put(`/api/nv/testsuits/${id}`, data);

export const deleteTask = (id) => axios.delete(`/api/nv/testsuits/${id}`);

export const getTask = (id) => axios.get(`/api/nv/testsuits/${id}`);

export const runTask = (id) => axios.get(`/api/task/${id}`);

export const getAllTestCases = (id) => axios.get('/api/nv/testcases/all', { params: { project_id: id } });

export const getAllEnvs = (id) => axios.get('/api/nv/envs/all', { params: { project_id: id } });
