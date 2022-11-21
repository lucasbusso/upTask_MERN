import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AuthLayout from './layouts/AuthLayout';
import PrivateRoute from './layouts/PrivateRoute';

import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import NewPassword from './pages/NewPassword';
import ConfirmAccout from "./pages/ConfirmAccout";
import Proyectos from './pages/Proyectos';
import NewProject from './pages/NewProject';
import Project from './pages/Project';
import EditProject from './pages/EditProject';

import { AuthProvider } from './context/AuthProvider';
import { ProyectosProvider } from './context/ProyectosProvider';

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <ProyectosProvider>
          <Routes>
            {/* Public paths */}
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path="signup" element={<SignUp />} />
              <Route path="reset-password" element={<ForgotPassword />} />
              <Route path="reset-password/:token" element={<NewPassword />} />
              <Route path="confirm-account/:id" element={<ConfirmAccout />} />
            </Route>
            <Route path="/projects" element={<PrivateRoute />}>
              <Route index element={<Proyectos />} />
              <Route path="new-project" element={<NewProject />} />
              <Route path=":id" element={<Project />} />
              <Route path="edit/:id" element={<EditProject />} />
            </Route>
          </Routes>
        </ProyectosProvider>
      </AuthProvider>
    </BrowserRouter>
  );
  
}

export default App
