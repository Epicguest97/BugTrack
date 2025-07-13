import { NavLink, useParams } from 'react-router-dom';
import { useProjects } from '@/hooks/useApi';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

const tabs = [
  { id: 'summary', label: 'Summary', path: '' },
  { id: 'backlog', label: 'Backlog', path: '/backlog' },
  { id: 'board', label: 'Board', path: '/board' },
  { id: 'timeline', label: 'Timeline', path: '/timeline' }
];

export function ProjectHeader() {
  const { projectId } = useParams();
  const { projects, loading } = useProjects();
  const project = projects.find(p => p.id === projectId);

  if (loading) {
    return (
      <div className="border-b border-border bg-muted/20">
        <div className="px-6 py-4 flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span className="text-sm text-muted-foreground">Loading project...</span>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="border-b border-border bg-muted/20">
        <div className="px-6 py-4">
          <div className="text-red-500 font-mono">Project not found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="border-b border-border bg-muted/20">
      <div className="px-6 py-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
          <h1 className="text-2xl font-mono font-bold text-foreground tracking-wide">
            {project.key?.toUpperCase() || project.name.substring(0, 3).toUpperCase()}
          </h1>
          <span className="text-sm text-muted-foreground font-mono">
            // {project.name}
          </span>
        </div>
        
        <nav className="flex space-x-1 bg-muted/30 p-1 rounded-lg border border-border/50">
          {tabs.map((tab) => (
            <NavLink
              key={tab.id}
              to={`/project/${projectId}${tab.path}`}
              end={tab.id === 'summary'}
              className={({ isActive }) =>
                cn(
                  'px-4 py-2 text-sm font-mono font-medium rounded-md transition-all duration-200 uppercase tracking-wide',
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                )
              }
            >
              {tab.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
}