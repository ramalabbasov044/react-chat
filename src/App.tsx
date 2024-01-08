import { Routes, Route } from 'react-router-dom';
import Router from './constants/router';
import SignUp from './pages/register/index';
import Error from './pages/error/index';
import Login from './pages/login/index';
import Home from './pages/home/index';
import Profile from './pages/profile';
import './assets/css/reset.css';
import React from 'react';

const App = () => {
  return (
    <>
      <Routes>
          <Route element={<Home />} path={Router.home} />
          <Route element={<Login />} path={Router.login} />
          <Route element={<SignUp />} path={Router.signup} />
          <Route element={<Profile />} path={Router.profile} />

          <Route element={<Error />} path='*' />
      </Routes>
    </>
  );
}

export default App;
