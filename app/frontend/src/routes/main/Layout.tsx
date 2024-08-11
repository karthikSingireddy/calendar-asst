import { createContext, useEffect, useRef, useState } from 'react';
import { Navbar } from '../../components/navbar/Navbar';
import { cn, ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@calendar-asst/components';
import { useToggle } from '../../hooks/toggle';
import { Outlet } from 'react-router-dom';

export const MainViewHeightContext = createContext(0);

export default function Layout() {
  const [opened, openedState] = useToggle(false);

  return <div className="" style={{ height: '100vh' }}>
    <ResizablePanelGroup
      direction="horizontal"
    >
      <ResizablePanel
        collapsible
        defaultSize={30}
        minSize={20}
        maxSize={30}
        collapsedSize={0}
        onCollapse={() => openedState.set(false)}
        className={cn(
          opened &&
          "min-w-[50px] transition-all duration-300 ease-in-out"
        )}
      >

        <Navbar />
      </ResizablePanel>

      <ResizableHandle withHandle />

      <ResizablePanel
        defaultSize={70}
        minSize={30}>
        <Outlet />
      </ResizablePanel>

    </ResizablePanelGroup>
  </div>
}
