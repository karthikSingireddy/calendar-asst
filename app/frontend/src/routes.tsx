import { createBrowserRouter } from 'react-router-dom';
import { SignUpPage } from './routes/SignUp.page';
import { LoginPage } from './routes/Login.page';
import MainLayout from './routes/main/Layout';
import { ChatPage } from './routes/main/Chat.page';

export default createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/chat/:chatId',
        element: <ChatPage />
      }
    ]
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
