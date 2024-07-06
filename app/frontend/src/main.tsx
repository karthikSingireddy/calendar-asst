import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import '@mantine/core/styles.css';
import { Button, MantineProvider } from '@mantine/core';
import { SignUpPage } from './routes/SignUp.page';
import { types } from '@calendar-asst/types';
import { LoginPage } from './routes/Login.page';

const router = createBrowserRouter([
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
])

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <MantineProvider >
    <RouterProvider router={router} />
  </MantineProvider>
);
