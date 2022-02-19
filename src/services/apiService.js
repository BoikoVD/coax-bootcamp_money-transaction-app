import Cookies from 'js-cookie';
import { authApi, restApi } from '../http/api';

export const loginRequest = async (email, password) => {
  return await authApi.post(`/token?grant_type=password`, {
    email,
    password
  }).then((res) => {
    return res;
  });
};

export const logoutRequest = async () => {
  return await authApi.post(`/logout`, {}, {
    headers: {
      'Authorization': `Bearer ${Cookies.get("accessToken")}`
    }
  }).then((res) => {
    return res;
  });
};

export const signUpRequest = async (email, password) => {
  return await authApi.post(`/signup`, {
    email,
    password
  }).then((res) => {
    return res;
  });
};

export const getUserRequest = async () => {
  return await authApi.get(`/user`, {
    headers: {
      'Authorization': `Bearer ${Cookies.get("accessToken")}`
    }
  }).then((res) => {
    return res;
  });
};

export const resetPasswordRequest = async (newPassword) => {
  return await authApi.put(`/user`, {
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
  return await restApi.get(`/profile?user=eq.${id}&select=*`, {
    headers: {
      'Authorization': `Bearer ${Cookies.get("accessToken")}`
    }
  }).then((res) => {
    return res;
  });
};

export const getProfilesOfContactsRequest = async (from, to, searchText, arrayOfId) => {
  const strOfId = arrayOfId.join(",");
  return await restApi.get(`/profile?select=*&user=in.%28${strOfId}%29&or=%28firstName.ilike.%25${searchText}%25%2ClastName.ilike.%25${searchText}%25%2Cemail.ilike.%25${searchText}%25%29`, {
    headers: {
      'Authorization': `Bearer ${Cookies.get("accessToken")}`,
      'Prefer': `count=exact,head=true`,
      'Range': `${from}-${to}`
    }
  }).then((res) => {
    return res;
  });
};

export const getProfilesOfAllUsersRequest = async (from, to, searchText, currentUserId) => {
  return await restApi.get(`/profile?select=*&or=%28firstName.ilike.%25${searchText}%25%2ClastName.ilike.%25${searchText}%25%2Cemail.ilike.%25${searchText}%25%29&user=neq.${currentUserId}`, {
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
  return await restApi.get(`/profile?select=*`, {
    headers: {
      'Authorization': `Bearer ${Cookies.get("accessToken")}`
    }
  }).then((res) => {
    return res;
  });
};

export const getProfilesForTransactionsRequest = async (arrayOfId) => {
  const strOfId = arrayOfId.join(",");
  return await restApi.get(`/profile?user=in.(${strOfId})&select=*`, {
    headers: {
      'Authorization': `Bearer ${Cookies.get("accessToken")}`
    }
  }).then((res) => {
    return res;
  });
};

export const createProfileRequest = async (userId, email, firstName, lastName, accessToken) => {
  return await restApi.post(`/profile`, {
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
  return restApi.patch(`/profile?id=eq.${profileId}`, {
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

export const addContactRequest = async (ownerId, contactId) => {
  return restApi.post(`/contact`, {
    owner: ownerId,
    contact: contactId
  }, {
    headers: {
      'Authorization': `Bearer ${Cookies.get("accessToken")}`,
      'Prefer': `return=representation`,
    }
  }).then((res) => {
    return res;
  });
};

export const deleteContactRequest = async (ownerId, contactId) => {
  return restApi.delete(`/contact?owner=eq.${ownerId}&contact=eq.${contactId}`, {
    headers: {
      'Authorization': `Bearer ${Cookies.get("accessToken")}`
    }
  }).then((res) => {
    return res;
  });
};

export const getOwnContactsRequest = async (ownerId) => {
  return restApi.get(`/contact?owner=eq.${ownerId}&select=contact`, {
    headers: {
      'Authorization': `Bearer ${Cookies.get("accessToken")}`
    }
  }).then((res) => {
    return res;
  });
};

export const createTransactionRequest = async (from, to, amount) => {
  return restApi.post(`/transaction`, {
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
  return restApi.get(`/transaction?${column}=eq.${id}&select=*`, {
    headers: {
      'Authorization': `Bearer ${Cookies.get("accessToken")}`
    }
  }).then((res) => {
    return res;
  });
};