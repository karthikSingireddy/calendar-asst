import * as ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import router from './routes'
import { RecoilRoot } from 'recoil';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <RecoilRoot>
    <MantineProvider defaultColorScheme='dark'>
      <RouterProvider router={router} />
    </MantineProvider>
  </RecoilRoot>
);
