
import { Outlet } from 'react-router-dom';
import { ProjectHeader } from '@/components/layout/ProjectHeader';

export default function ProjectLayout() {
  return (
    <div className="flex-1 flex flex-col h-full">
      <ProjectHeader />
      <main className="flex-1 bg-background overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
