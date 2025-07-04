import axios from 'axios';
const apiBase = process.env.REACT_APP_API_BASE_URL;

export const login = (data) => axios.post(`${apiBase}/api/auth/login`, data);

export const studentSignup = (data) => axios.post(`${apiBase}/api/auth/student/signup`, data);

export const teacherSignup = (data) => axios.post(`${apiBase}/api/auth/teacher/signup`, data);
