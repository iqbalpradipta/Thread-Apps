import { BrowserRouter, Navigate, Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import DetailPage from './pages/detailThread';
import Home from './pages/Home';
import Search from './pages/Search';
import Following from './pages/Following';
import Profile from './pages/Profile';
import { RootState } from './stores/types';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { API } from './libs/api';
import { AUTH_CHECK } from './stores/rootReducer';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/threads/:id" element={<DetailPage />} />
          <Route path="/following" element={<Following />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
