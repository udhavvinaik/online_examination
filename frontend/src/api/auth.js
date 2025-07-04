import axios from 'axios';
const apiBase = process.env.REACT_APP_API_BASE_URL;
const BASE_URL = `${apiBase}/api/auth`;

export const login = (data) => axios.post(`${BASE_URL}/login`, data);

export const studentSignup = (data) => axios.post(`${BASE_URL}/student/signup`, data);

export const teacherSignup = (data) => axios.post(`${BASE_URL}/teacher/signup`, data);
