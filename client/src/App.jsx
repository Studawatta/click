import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useContext } from 'react';
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from 'react-router-dom';
import LeftBar from './components/leftBar/LeftBar';
import NavBar from './components/navBar/NavBar';
import RightBar from './components/rightBar/RightBar';
import { AuthContext } from './context/authContext';
import { DarkModeContext } from './context/darkModeContext';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Profile from './pages/profile/Profile';
import Register from './pages/register/Register';
import UpdateProfile from './pages/updateProfile/UpdateProfile';
import './style.scss';

const App = () => {
  const currentUser = useContext(AuthContext);

  const { darkMode } = useContext(DarkModeContext);

  const quetyClient = new QueryClient();

  const Layout = () => {
    return (
      <QueryClientProvider client={quetyClient}>
        <div className={`theme-${darkMode ? 'dark' : 'light'}`}>
          <NavBar />
          <div style={{ display: 'flex' }}>
            <LeftBar />
            <div style={{ flex: 6 }}>
              <Outlet />
            </div>
            <RightBar />
          </div>
        </div>
      </QueryClientProvider>
    );
  };

  const ProtectedRoute = () => {
    if (!currentUser.currentUser) {
      return <Navigate to="/login" />;
    }

    return <Layout />;
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/update/:id" element={<UpdateProfile />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
