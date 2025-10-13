import React from 'react';

export interface SidebarContextValue {
  collapsed: boolean;
}

export const SidebarContext = React.createContext<SidebarContextValue>({
  collapsed: false,
});

export const useSidebar = () => {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a Sidebar component');
  }
  return context;
};
