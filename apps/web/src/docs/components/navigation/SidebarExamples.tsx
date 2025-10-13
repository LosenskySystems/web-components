import { useState } from 'react';
import { Sidebar } from '@losensky-systems/web-components-core';

// Modern, beautiful icons
const DashboardIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z" />
  </svg>
);

const ProjectsIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
  </svg>
);

const TeamIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
  </svg>
);

const TasksIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
  </svg>
);

const ReportsIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const SettingsIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export const BasicSidebarExample = () => (
  <div className="h-96 border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
    <Sidebar demo>
      <Sidebar.Header>
        <div className="text-xl font-bold">MyApp</div>
      </Sidebar.Header>
      <Sidebar.Nav>
        <Sidebar.Item href="/" active>Dashboard</Sidebar.Item>
        <Sidebar.Item href="/projects">Projects</Sidebar.Item>
        <Sidebar.Item href="/team">Team</Sidebar.Item>
        <Sidebar.Item href="/settings">Settings</Sidebar.Item>
      </Sidebar.Nav>
    </Sidebar>
  </div>
);

export const SidebarWithIconsExample = () => (
  <div className="h-96 border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
    <Sidebar demo>
      <Sidebar.Header>
        <div className="text-xl font-bold">MyApp</div>
      </Sidebar.Header>
      <Sidebar.Nav>
        <Sidebar.Item href="/" active icon={<DashboardIcon />}>
          Dashboard
        </Sidebar.Item>
        <Sidebar.Item href="/projects" icon={<ProjectsIcon />}>
          Projects
        </Sidebar.Item>
        <Sidebar.Item href="/team" icon={<TeamIcon />}>
          Team
        </Sidebar.Item>
        <Sidebar.Item href="/settings" icon={<SettingsIcon />}>
          Settings
        </Sidebar.Item>
      </Sidebar.Nav>
    </Sidebar>
  </div>
);

export const CollapsibleSidebarExample = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="h-96 border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
      <Sidebar demo collapsed={collapsed}>
        <Sidebar.Header>
          <div className="text-xl font-bold">MyApp</div>
        </Sidebar.Header>
        <Sidebar.Toggle 
          collapsed={collapsed} 
          onClick={() => setCollapsed(!collapsed)} 
        />
        <Sidebar.Nav>
          <Sidebar.Item href="/" active icon={<DashboardIcon />}>
            Dashboard
          </Sidebar.Item>
          <Sidebar.Item href="/projects" icon={<ProjectsIcon />}>
            Projects
          </Sidebar.Item>
          <Sidebar.Item href="/team" icon={<TeamIcon />}>
            Team
          </Sidebar.Item>
          <Sidebar.Item href="/settings" icon={<SettingsIcon />}>
            Settings
          </Sidebar.Item>
        </Sidebar.Nav>
      </Sidebar>
    </div>
  );
};

export const SidebarPositionExample = () => (
  <div className="space-y-6">
    <div>
      <p className="text-sm text-gray-600 mb-2">Left Position (default)</p>
      <div className="h-64 border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
        <Sidebar demo position="left">
          <Sidebar.Header>
            <div className="text-xl font-bold">Left Sidebar</div>
          </Sidebar.Header>
          <Sidebar.Nav>
            <Sidebar.Item href="/" active icon={<DashboardIcon />}>
              Dashboard
            </Sidebar.Item>
            <Sidebar.Item href="/projects" icon={<ProjectsIcon />}>
              Projects
            </Sidebar.Item>
            <Sidebar.Item href="/team" icon={<TeamIcon />}>
              Team
            </Sidebar.Item>
          </Sidebar.Nav>
        </Sidebar>
      </div>
    </div>
    <div>
      <p className="text-sm text-gray-600 mb-2">Right Position</p>
      <div className="h-64 border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
        <Sidebar demo position="right">
          <Sidebar.Header>
            <div className="text-xl font-bold">Right Sidebar</div>
          </Sidebar.Header>
          <Sidebar.Nav>
            <Sidebar.Item href="/" active icon={<DashboardIcon />}>
              Dashboard
            </Sidebar.Item>
            <Sidebar.Item href="/projects" icon={<ProjectsIcon />}>
              Projects
            </Sidebar.Item>
            <Sidebar.Item href="/team" icon={<TeamIcon />}>
              Team
            </Sidebar.Item>
          </Sidebar.Nav>
        </Sidebar>
      </div>
    </div>
  </div>
);

export const SidebarVariantExample = () => (
  <div className="space-y-6">
    <div>
      <p className="text-sm text-gray-600 mb-2">Light Variant</p>
      <div className="h-64 border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
        <Sidebar demo variant="light">
          <Sidebar.Header>
            <div className="text-xl font-bold text-gray-900">Light Sidebar</div>
          </Sidebar.Header>
          <Sidebar.Nav>
            <Sidebar.Item href="/" active icon={<DashboardIcon />}>
              Dashboard
            </Sidebar.Item>
            <Sidebar.Item href="/projects" icon={<ProjectsIcon />}>
              Projects
            </Sidebar.Item>
            <Sidebar.Item href="/team" icon={<TeamIcon />}>
              Team
            </Sidebar.Item>
          </Sidebar.Nav>
        </Sidebar>
      </div>
    </div>
    <div>
      <p className="text-sm text-gray-600 mb-2">Dark Variant</p>
      <div className="h-64 border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
        <Sidebar demo variant="dark">
          <Sidebar.Header>
            <div className="text-xl font-bold text-white">Dark Sidebar</div>
          </Sidebar.Header>
          <Sidebar.Nav>
            <Sidebar.Item href="/" active icon={<DashboardIcon />}>
              Dashboard
            </Sidebar.Item>
            <Sidebar.Item href="/projects" icon={<ProjectsIcon />}>
              Projects
            </Sidebar.Item>
            <Sidebar.Item href="/team" icon={<TeamIcon />}>
              Team
            </Sidebar.Item>
          </Sidebar.Nav>
        </Sidebar>
      </div>
    </div>
  </div>
);

export const GroupedSidebarExample = () => (
  <div className="h-96 border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
    <Sidebar demo>
      <Sidebar.Header>
        <div className="text-xl font-bold">MyApp</div>
      </Sidebar.Header>
      <Sidebar.Nav>
        <Sidebar.Item href="/" active icon={<DashboardIcon />}>
          Dashboard
        </Sidebar.Item>
        
        <Sidebar.Group label="Project Management">
          <Sidebar.Item href="/projects" icon={<ProjectsIcon />}>
            Projects
          </Sidebar.Item>
          <Sidebar.Item href="/tasks" icon={<TasksIcon />}>
            Tasks
          </Sidebar.Item>
        </Sidebar.Group>
        
        <Sidebar.Group label="Team">
          <Sidebar.Item href="/team" icon={<TeamIcon />}>
            Team Members
          </Sidebar.Item>
          <Sidebar.Item href="/reports" icon={<ReportsIcon />}>
            Reports
          </Sidebar.Item>
        </Sidebar.Group>
      </Sidebar.Nav>
    </Sidebar>
  </div>
);

export const CompleteSidebarExample = () => (
  <div className="h-96 border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
    <Sidebar demo>
      <Sidebar.Header>
        <div className="text-xl font-bold">MyApp</div>
        <div className="text-sm text-gray-500">v2.0.0</div>
      </Sidebar.Header>
      
      <Sidebar.Nav>
        <Sidebar.Item href="/" active icon={<DashboardIcon />}>
          Dashboard
        </Sidebar.Item>
        <Sidebar.Item href="/projects" icon={<ProjectsIcon />}>
          Projects
        </Sidebar.Item>
        <Sidebar.Item href="/team" icon={<TeamIcon />}>
          Team
        </Sidebar.Item>
        <Sidebar.Item href="/settings" icon={<SettingsIcon />}>
          Settings
        </Sidebar.Item>
      </Sidebar.Nav>
      
      <Sidebar.Footer>
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg shadow-sm flex items-center justify-center">
            <span className="text-white text-xs font-bold">JD</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-gray-900 truncate">John Doe</div>
            <div className="text-xs text-gray-500 truncate">john@example.com</div>
          </div>
        </div>
      </Sidebar.Footer>
    </Sidebar>
  </div>
);

export const SidebarWidthExample = () => (
  <div className="space-y-6">
    <div>
      <p className="text-sm text-gray-600 mb-2">Small Width (w-56)</p>
      <div className="h-64 border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
        <Sidebar demo width="sm">
          <Sidebar.Header>
            <div className="text-lg font-bold">Small</div>
          </Sidebar.Header>
          <Sidebar.Nav>
            <Sidebar.Item href="/" active icon={<DashboardIcon />}>
              Dashboard
            </Sidebar.Item>
            <Sidebar.Item href="/projects" icon={<ProjectsIcon />}>
              Projects
            </Sidebar.Item>
            <Sidebar.Item href="/team" icon={<TeamIcon />}>
              Team
            </Sidebar.Item>
          </Sidebar.Nav>
        </Sidebar>
      </div>
    </div>
    <div>
      <p className="text-sm text-gray-600 mb-2">Medium Width (w-64) - Default</p>
      <div className="h-64 border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
        <Sidebar demo width="md">
          <Sidebar.Header>
            <div className="text-xl font-bold">Medium</div>
          </Sidebar.Header>
          <Sidebar.Nav>
            <Sidebar.Item href="/" active icon={<DashboardIcon />}>
              Dashboard
            </Sidebar.Item>
            <Sidebar.Item href="/projects" icon={<ProjectsIcon />}>
              Projects
            </Sidebar.Item>
            <Sidebar.Item href="/team" icon={<TeamIcon />}>
              Team
            </Sidebar.Item>
          </Sidebar.Nav>
        </Sidebar>
      </div>
    </div>
    <div>
      <p className="text-sm text-gray-600 mb-2">Large Width (w-72)</p>
      <div className="h-64 border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
        <Sidebar demo width="lg">
          <Sidebar.Header>
            <div className="text-xl font-bold">Large</div>
          </Sidebar.Header>
          <Sidebar.Nav>
            <Sidebar.Item href="/" active icon={<DashboardIcon />}>
              Dashboard
            </Sidebar.Item>
            <Sidebar.Item href="/projects" icon={<ProjectsIcon />}>
              Projects
            </Sidebar.Item>
            <Sidebar.Item href="/team" icon={<TeamIcon />}>
              Team
            </Sidebar.Item>
          </Sidebar.Nav>
        </Sidebar>
      </div>
    </div>
  </div>
);
