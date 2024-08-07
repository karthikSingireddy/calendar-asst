import { Outlet } from 'react-router-dom';
import {
  AppShell,
  Burger,
  Group,
  useMantineColorScheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconMoon, IconSun } from '@tabler/icons-react';
import { createContext, useEffect, useRef, useState } from 'react';
import { Navbar } from '../../components/navbar/Navbar';

export const MainViewHeightContext = createContext(0);

export default function Layout() {
  const [opened, { toggle }] = useDisclosure();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const mainRef = useRef<HTMLElement>(null);
  const [mainViewHeight, setMainViewHeight] = useState(0);

  useEffect(() =>{
    if (mainRef.current) {
      let height = parseFloat(getComputedStyle(mainRef.current).height);
      height -= parseFloat(getComputedStyle(mainRef.current).paddingTop);
      height -= parseFloat(getComputedStyle(mainRef.current).paddingBottom);
      setMainViewHeight(height);
    }
  }, []);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened, desktop: opened }
      }}
    >
      <AppShell.Header>
        <Group h="100%" px="md" align="center" justify="space-between">
          <Group>
            <Burger opened={false} onClick={toggle} size="md" lineSize={1.5}/>
            <p>calendar assist thing</p>
          </Group>

          <div>
            { colorScheme === 'dark' ?
              <IconMoon cursor='pointer' size={26} onClick={toggleColorScheme} />
            : <IconSun cursor="pointer" size={28} onClick={toggleColorScheme} />
            }
          </div>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md" >
        <Navbar />
      </AppShell.Navbar>

      <AppShell.Main
        ref={mainRef}
        style={{
          display: 'flex',
          flexDirection: 'row',
          maxWidth: '100%',
          overflow: 'hidden'
        }}
      >
        <MainViewHeightContext.Provider value={mainViewHeight}>
          <Outlet />
        </MainViewHeightContext.Provider>
      </AppShell.Main>
    </AppShell>
  );
}
