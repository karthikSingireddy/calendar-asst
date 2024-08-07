import { MantineProvider } from '@mantine/core';

import '@mantine/core/styles.css';
import { MemoryRouter } from 'react-router-dom';


export const decorators = [
  // @ts-expect-error idk why this is happening
  (renderStory: any) => (
    <MantineProvider>
      <MemoryRouter initialEntries={['/']}>
        {renderStory()}
      </MemoryRouter>
    </MantineProvider>
  )
];
