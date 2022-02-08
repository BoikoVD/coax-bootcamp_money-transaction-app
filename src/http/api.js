import axios from 'axios';

const API_AUTH_URL = process.env.React_App_SUPABASE_URL + '/auth/v1';
const API_PROFILE_URL = process.env.React_App_SUPABASE_URL + '/rest/v1';

export const signupRequest = async (email, password) => {
  const data = await axios.post(`${API_AUTH_URL}/signup`, {
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

export const resetPasswordRequest = async (accessToken, newPassword) => {
  const data = await axios.put(`${API_AUTH_URL}/user`, {
    password: newPassword
  }, {
    headers: {
      'apikey': process.env.React_App_API_KEY,
      'Authorization': `Bearer ${accessToken}`
    }
  }).then((res) => {
    return res;
  });
  return data;
};

export const getProfileRequest = async (id, accessToken, type) => {
  const data = await axios.get(`${API_PROFILE_URL}/profile?${type}=eq.${id}&select=*`, {
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

export const createProfileRequest = async (firstName, lastName, userId, email) => {
  const data = await axios.post(`${API_PROFILE_URL}/profile`, {
    firstName,
    lastName,
    user: userId,
    email
  }, {
    headers: {
      'apikey': process.env.React_App_API_KEY
    }
  }).then((res) => {
    return res;
  });
  return data;
};

export const updateProfileDataRequest = async (accessToken, newFirstName, newLastName, profileId) => {
  const data = await axios.patch(`${API_PROFILE_URL}/profile?id=eq.${profileId}`, {
    firstName: newFirstName,
    lastName: newLastName,
  }, {
    headers: {
      'apikey': process.env.React_App_API_KEY,
      'Authorization': `Bearer ${accessToken}`
    }
  }).then((res) => {
    return res;
  });
  return data;
};