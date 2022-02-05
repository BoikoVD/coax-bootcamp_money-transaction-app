import axios from 'axios';

const API_AUTH_URL = process.env.React_App_SUPABASE_URL + '/auth/v1';
const API_PROFILE_URL = process.env.React_App_SUPABASE_URL + '/rest/v1';

export const authApi = axios.create({
  baseURL: API_AUTH_URL,
  headers: {
    'apikey': process.env.React_App_API_KEY,
  }
});

export const profileApi = axios.create({
  baseURL: API_PROFILE_URL,
  headers: {
    'apikey': process.env.React_App_API_KEY,
  }
});

export const loginApiRequest = async (email, password) => {
  const data = await axios.post(`${API_AUTH_URL}/token?grant_type=password`, {
    email,
    password
  }, {
    headers: {
      'apikey': process.env.React_App_API_KEY
    }
  }).then((res) => {
    return res;
  });
  return data;
};

export const getUserRequest = async (accessToken) => {
  const data = await axios.get(`${API_AUTH_URL}/user`, {
    headers: {
      'apikey': process.env.React_App_API_KEY,
      'Authorization': `Bearer ${accessToken}`
    }
  }).then((res) => {
    return res;
  });
  return data;
};

export const getAllProfilesRequest = async () => {
  const data = await axios.get(`${API_PROFILE_URL}/profile?select=*`, {
    headers: {
      'apikey': process.env.React_App_API_KEY
    }
  }).then((res) => {
    return res;
  });
  return data;
};