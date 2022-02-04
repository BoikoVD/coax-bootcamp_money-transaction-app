import axios from 'axios';

const API_AUTH_URL = process.env.React_App_SUPABASE_URL + '/auth/v1';
const API_PROFILE_URL = process.env.React_App_SUPABASE_URL + '/rest/v1';

export const authApi = axios.create({
  baseURL: API_AUTH_URL,
  headers: {
    'apikey': process.env.React_App_API_KEY,
    'Content-Type': 'application/json'
  }
});

export const profileApi = axios.create({
  baseURL: API_PROFILE_URL,
  headers: {
    'apikey': process.env.React_App_API_KEY,
  }
});