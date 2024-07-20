import * as ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import router from './routes'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <MantineProvider defaultColorScheme='dark'>
    <RouterProvider router={router} />
  </MantineProvider>
);
