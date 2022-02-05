import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Layout from '../pages/Layout';
import Login from '../pages/Login/Login';
import Registration from '../pages/Registration/Registration';
import RegistrationCompleteMessage from '../pages/RegistrationCompleteMessage/RegistrationCompleteMessage';
import Dashboard from '../pages/Dashboard/Dashboard';
import Contacts from '../pages/Contacts/Contacts';
import Transactions from '../pages/Transactions/Transactions';
import MyProfile from '../pages/MyProfile/MyProfile';
import NotFound from '../pages/NotFound/NotFound';

function AppRouter({ isAuth }) {

  if (isAuth) {
    return (
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<Dashboard />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="my-profile" element={<MyProfile />} />
          <Route path="not-found" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/not-found" replace />} />
        </Route>
      </Routes>
    );
  } else {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/registration/complete" element={<RegistrationCompleteMessage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }
}

AppRouter.propTypes = {
  isAuth: PropTypes.bool.isRequired
}

export default AppRouter;
