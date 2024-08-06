import { MantineProvider } from '@mantine/core';

import '@mantine/core/styles.css';
import { MemoryRouter } from 'react-router-dom';


export const decorators = [
  // @ts-ignore
  (renderStory: any) => (
    <MantineProvider>
      <MemoryRouter initialEntries={['/']}>
        {renderStory()}
      </MemoryRouter>
    </MantineProvider>
  )
];
