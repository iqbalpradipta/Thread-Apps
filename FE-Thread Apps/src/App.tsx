import { BrowserRouter, Navigate, Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import DetailPage from './pages/detailThread';
import Home from './pages/Home';
import Search from './pages/Search';
import Following from './pages/Following';
import Profile from './pages/Profile';

function App() {
  const token = sessionStorage.getItem('token')

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={token ? <Home /> : <Navigate to="/login" />} />
          <Route path="/search" element={token ? <Search /> : <Navigate to="/login" />} />
          <Route path="/threads/:id" element={token ? <DetailPage /> : <Navigate to="/login" />} />
          <Route path="/following" element={token ? <Following /> : <Navigate to="/login" />} />
          <Route path="/profile" element={token ? <Profile /> : <Navigate to="/login" />} />
          <Route path="/login" element={!token ? <Login /> : <Navigate to='/' />} />
          <Route path="/Register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
