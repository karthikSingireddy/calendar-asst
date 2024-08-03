import { Outlet } from 'react-router-dom';
import { AppShell, Burger, Group, Skeleton, useMantineColorScheme } from '@mantine/core';
import { Simulate } from 'react-dom/test-utils';
import toggle = Simulate.toggle;
import { useDisclosure } from '@mantine/hooks';
import { IconMoon, IconSun } from '@tabler/icons-react';

export default function Layout() {
  const [opened, { toggle }] = useDisclosure();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

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
        Navbar
        {Array(15)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} h={28} mt="sm" animate={false} />
          ))}
      </AppShell.Navbar>
      <AppShell.Main style={{
        display: 'flex',
        flexDirection: 'row',
        maxWidth: '100%'
      }}>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
