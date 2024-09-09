import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:9000';
const ACCESS_TOKEN =
  'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImlkIjoiMSIsImF1dGhvcml0eSI6IlJPTEVfVVNFUiIsInR5cGUiOiJCZWFyZXIiLCJpYXQiOjE3MjU4OTQ3MjQsImV4cCI6MTc1NzQ1MjMyNH0.1w99MVdiUnn2K1coIYpdZ2rP-FyqAJVLUKijHiobFokArpezfU3XMhqg7JowIH-PrtI9vPzE5jmiSlZfcmSlAQ';

export const publicClient = axios.create({
  baseURL: BASE_URL,
});

export const authClient = axios.create({
  baseURL: BASE_URL,
});

authClient.interceptors.request.use(
  async (config) => {
    config.headers['Authorization'] = `Bearer ${ACCESS_TOKEN}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
