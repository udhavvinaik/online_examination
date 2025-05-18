import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/auth';

export const login = (data) => axios.post(`${BASE_URL}/login`, data);

export const studentSignup = (data) => axios.post(`${BASE_URL}/student/signup`, data);

export const teacherSignup = (data) => axios.post(`${BASE_URL}/teacher/signup`, data);
