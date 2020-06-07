import axios from 'axios';

export const getUser = () => axios.get('/api/git/v4/user');

export const getAllProjects = (page) => axios.get(`/api/git/v4/projects?membership=true&simple=true&per_page=20&page=${page}`);

export const getProjects = () => axios.get('/api/repos');

export const postProject = (id) => axios.post('/api/repo', { id });

export const getProject = (id) => axios.get(`/api/git/v4/projects/${id}`);

export const deleteProject = (id) => axios.delete(`/api/repo/${id}`);

export const getRepoTree = (id) => axios.get(`/api/git/v4/projects/${id}/repository/tree`);

export const getRepoTreePath = (id, path) => axios.get(`/api/git/v4/projects/${id}/repository/tree?path=${path}`);

export const getRepoTreeFile = (id, path, ref) => axios.get(`/api/git/v4/projects/${id}/repository/files/${path}/raw?ref=${ref}`);
