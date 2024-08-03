import { createBrowserRouter } from 'react-router-dom';
import { SignUpPage } from './routes/SignUp.page';
import { LoginPage } from './routes/Login.page';
import MainLayout from './routes/main/Layout';

export default createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />
  },
  {
    path: '/signup',
    element: <SignUpPage />
  },
  {
    path: '/login',
    element: <LoginPage />
  }
]);
