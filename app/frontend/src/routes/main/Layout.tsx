import { Outlet, useNavigate } from 'react-router-dom';
import { AppShell, Burger, Button, Group, Skeleton, useMantineColorScheme } from '@mantine/core';
import { Simulate } from 'react-dom/test-utils';
import toggle = Simulate.toggle;
import { useDisclosure } from '@mantine/hooks';
import { IconMoon, IconSun } from '@tabler/icons-react';
import { createContext, MutableRefObject, useEffect, useRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import ChatAPI from '../../api/chat';
import { ChatDAO } from '@calendar-asst/types';

export const MainViewHeightContext = createContext(0);

export default function Layout() {
  const [opened, { toggle }] = useDisclosure();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const navigate = useNavigate();

  const mainRef = useRef<HTMLElement>(null);
  const [mainViewHeight, setMainViewHeight] = useState(0);

  const newChatMutation = useMutation<ChatDAO>({
    mutationFn: ChatAPI.createChat
  });

  useEffect(() =>{
    if (mainRef.current) {
      let height = parseFloat(getComputedStyle(mainRef.current).height);
      height -= parseFloat(getComputedStyle(mainRef.current).paddingTop);
      height -= parseFloat(getComputedStyle(mainRef.current).paddingBottom);
      setMainViewHeight(height);
    }
  }, []);

  function createNewChat() {
    newChatMutation.mutateAsync()
      .then((chat) => {
        console.log(chat);
        navigate(`/chat/${chat.id}`);
      })
      .catch(err => console.error(err));
  }


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
        <Button onClick={createNewChat}>new chat placeholder</Button>
        {Array(15)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} h={28} mt="sm" animate={false} />
          ))}
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
