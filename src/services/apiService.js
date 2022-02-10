import Cookies from 'js-cookie';
import { userApi, profileApi } from '../http/api';

export const loginRequest = async (email, password) => {
  return await userApi.post(`/token?grant_type=password`, {
    email,
    password
  }).then((res) => {
    return res;
  });
};

export const signUpRequest = async (email, password) => {
  return await userApi.post(`/signup`, {
    email,
    password
  }).then((res) => {
    return res;
  });
};

export const getUserRequest = async () => {
  return await userApi.get(`/user`, {
    headers: {
      'Authorization': `Bearer ${Cookies.get("accessToken")}`
    }
  }).then((res) => {
    return res;
  });
};

export const resetPasswordRequest = async (newPassword) => {
  return await userApi.put(`/user`, {
    password: newPassword
  }, {
    headers: {
      'Authorization': `Bearer ${Cookies.get("accessToken")}`
    }
  }).then((res) => {
    return res;
  });
};

export const getProfileRequest = async (id, column) => {
  return await profileApi.get(`/profile?${column}=eq.${id}&select=*`, {
    headers: {
      'Authorization': `Bearer ${Cookies.get("accessToken")}`
    }
  }, {
    headers: {
      'Authorization': `Bearer ${Cookies.get("accessToken")}`
    }
  }).then((res) => {
    return res;
  });
};

export const getProfilesWithPaginationRequest = async (from, to) => {
  return await profileApi.get(`/profile?select=*`, {
    headers: {
      'Authorization': `Bearer ${Cookies.get("accessToken")}`,
      'Prefer': `count=exact,head=true`,
      'Range': `${from}-${to}`
    }
  }).then((res) => {
    return res;
  });
};

export const getAllProfilesRequest = async () => {
  return await profileApi.get(`/profile?select=*`, {
    headers: {
      'Authorization': `Bearer ${Cookies.get("accessToken")}`
    }
  }).then((res) => {
    return res;
  });
};

export const createProfileRequest = async (userId, email, firstName, lastName) => {
  return await profileApi.post(`/profile`, {
    firstName,
    lastName,
    user: userId,
    email
  }, {
    headers: {
      'Authorization': `Bearer ${Cookies.get("accessToken")}`
    }
  }).then((res) => {
    return res;
  });
};

export const updateProfileDataRequest = async (newFirstName, newLastName, profileId) => {
  return profileApi.patch(`/profile?id=eq.${profileId}`, {
    firstName: newFirstName,
    lastName: newLastName,
  }, {
    headers: {
      'Authorization': `Bearer ${Cookies.get("accessToken")}`
    }
  }).then((res) => {
    return res;
  });
};