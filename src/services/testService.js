import axios from 'axios';

export const getTests = ({ params }) => axios.get('/api/nv/testcases', { params });

export const getTest = (id) => axios.get(`/api/nv/testcases/${id}`);

export const createTest = ({ params, data }) => axios.post('/api/nv/testcases', data, { params });

export const updateTest = ({ id, data }) => axios.put(`/api/nv/testcases/${id}`, data);

export const deleteTest = (id) => axios.delete(`/api/nv/testcases/${id}`);

export const runTest = (params) => axios.get(`/api/nv/testcases/${params.env_id}/${params.test_id}/run`);

export const getEnvs = ({ params }) => axios.get('/api/nv/envs', { params });

export const createEnv = ({ params, data }) => axios.post('/api/nv/envs', data, { params });

export const getEnv = (id) => axios.get(`/api/nv/envs/${id}/variables`);

export const deleteEnv = (id) => axios.delete(`/api/nv/envs/${id}`);

export const updateEnv = (id, data) => axios.put(`/api/nv/envs/${id}/variables`, { metadata: data });

export const getVariable = (id) => axios.get('/api/nv/repo/variables', { params: { project_id: id } });

export const updateVariable = (data, id) => axios.put('/api/nv/repo/variables', { metadata: data }, { params: { project_id: id } });

export const getScripts = (id) => axios.get('/api/nv/scripts', { params: { project_id: id } });

export const getScript = (id) => axios.get(`/api/nv/scripts/${id}`);

export const createScript = ({ params, data }) => axios.post('/api/nv/scripts', data, { params });

export const deleteScript = (id) => axios.delete(`/api/nv/scripts/${id}`);

export const updateScript = ({ id, data }) => axios.put(`/api/nv/scripts/${id}`, data);


export const getScriptsSelect = (id) => axios.get('/api/nv/scripts/select', { params: { project_id: id } });

export const copyTest = (id) => axios.get(`/api/nv/testcases/${id}/copy`);
