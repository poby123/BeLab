/* eslint-disable @typescript-eslint/no-var-requires */
const axios = require('axios');

const BASE_URL = 'http://127.0.0.1:9000';
const publicClient = axios.create({
  baseURL: BASE_URL,
});

const authClient = axios.create({
  baseURL: BASE_URL,
});

authClient.interceptors.request.use(
  async (config) => {
    const accessToken =
      'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImlkIjoiMSIsImF1dGhvcml0eSI6IlJPTEVfVVNFUiIsInR5cGUiOiJCZWFyZXIiLCJpYXQiOjE3MjU1NDMxMTAsImV4cCI6MTc1NzEwMDcxMH0.PdPnjbdlnZBeoii0a2hhslN6wfVpJnzLzQRz0IFIzDiJAhRdon4TNDjvYPfi2fxpHFiTFK8EwZ3sOJhk6GE-pA';
    config.headers['Authorization'] = accessToken;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

module.exports = {
  publicClient,
  authClient,
};
