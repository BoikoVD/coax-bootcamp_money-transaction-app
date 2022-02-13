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

export const getProfileRequest = async (id) => {
  return await profileApi.get(`/profile?user=eq.${id}&select=*`, {
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

export const getContactProfilesRequest = async (arrayOfId) => {
  const strOfId = arrayOfId.join(",");
  return await profileApi.get(`/profile?user=in.(${strOfId})&select=*`, {
    headers: {
      'Authorization': `Bearer ${Cookies.get("accessToken")}`
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

export const createProfileRequest = async (userId, email, firstName, lastName, accessToken) => {
  return await profileApi.post(`/profile`, {
    firstName,
    lastName,
    user: userId,
    email
  }, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
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

export const addContactRequest = async (owner, contact) => {
  return profileApi.post(`/contact`, {
    owner,
    contact
  }, {
    headers: {
      'Authorization': `Bearer ${Cookies.get("accessToken")}`,
      'Prefer': `return=representation`,
    }
  }).then((res) => {
    return res;
  });
};

export const deleteContactRequest = async (owner, contact) => {
  return profileApi.delete(`/contact?owner=eq.${owner}&contact=eq.${contact}`, {
    headers: {
      'Authorization': `Bearer ${Cookies.get("accessToken")}`
    }
  }).then((res) => {
    return res;
  });
};

export const getOwnContactsRequest = async (ownerId) => {
  return profileApi.get(`/contact?owner=eq.${ownerId}&select=contact`, {
    headers: {
      'Authorization': `Bearer ${Cookies.get("accessToken")}`
    }
  }).then((res) => {
    return res;
  });
};

export const createTransactionRequest = async (from, to, amount) => {
  return profileApi.post(`/transaction`, {
    from,
    to,
    amount
  }, {
    headers: {
      'Authorization': `Bearer ${Cookies.get("accessToken")}`,
      'Prefer': `return=representation`
    }
  }).then((res) => {
    return res;
  });
};

export const getTransactionsRequest = async (id, column) => {
  return profileApi.get(`/transaction?${column}=eq.${id}&select=*`, {
    headers: {
      'Authorization': `Bearer ${Cookies.get("accessToken")}`
    }
  }).then((res) => {
    return res;
  });
};