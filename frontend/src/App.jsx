import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AuthLayout from './layouts/AuthLayout';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import NewPassword from './pages/NewPassword';
import ConfirmAccout from './pages/ConfirmAccout';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* Public paths */}
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="reset-password" element={<ForgotPassword />} />
          <Route path="reset-password/:token" element={<NewPassword />} />
          <Route path="confirm-account/:id" element={<ConfirmAccout />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
  
}

export default App
