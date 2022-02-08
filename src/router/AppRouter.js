import React from 'react';
import PropTypes from 'prop-types';
import { Route, Routes, Navigate, useNavigate, useLocation } from 'react-router-dom';
import AppLayout from '../pages/AppLayout/AppLayout';
import Login from '../pages/Login/Login';
import Registration from '../pages/Registration/Registration';
import Dashboard from '../pages/Dashboard/Dashboard';
import Contacts from '../pages/Contacts/Contacts';
import Transactions from '../pages/Transactions/Transactions';
import Profile from '../pages/Profile/Profile';
import NotFound from '../pages/NotFound/NotFound';

function AppRouter({ isAuth }) {
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    if (location.pathname === "/login" && isAuth) {
      navigate("/");
    }
  }, [isAuth]);

  if (isAuth) {
    return (
      <Routes>
        <Route path="/" element={<AppLayout />} >
          <Route index element={<Dashboard />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="profile" element={<Profile />} />
          <Route path="profile/:id" element={<Profile />} />
          <Route path="not-found" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/not-found" replace />} />
        </Route>
      </Routes>
    );
  };
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

AppRouter.propTypes = {
  isAuth: PropTypes.bool.isRequired
}

export default AppRouter;
