import axios from 'axios';

const AUTH_API_URL = process.env.React_App_SUPABASE_URL + '/auth/v1';
const REST_API_URL = process.env.React_App_SUPABASE_URL + '/rest/v1';

export const authApi = axios.create({
  baseURL: AUTH_API_URL,
  headers: {
    'apikey': process.env.React_App_API_KEY
  }
});

export const restApi = axios.create({
  baseURL: REST_API_URL,
  headers: {
    'apikey': process.env.React_App_API_KEY
  }
});