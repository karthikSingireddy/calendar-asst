import { createBrowserRouter } from 'react-router-dom';
import { SignUpPage } from './routes/SignUp.page';
import { LoginPage } from './routes/Login.page';

export default createBrowserRouter([
  {
    path: '/',
    element: <p>test</p>
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
