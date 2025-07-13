import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { Bug, Settings, FolderOpen, Plus, ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProjectDialog } from '@/components/projects/ProjectDialog';
import { ApiStatus } from '@/components/ui/api-status';
import { useProjects } from '@/hooks/useApi';
import { cn } from '@/lib/utils';

export function AppSidebar() {
  const [isProjectsExpanded, setIsProjectsExpanded] = useState(true);
  const { projects, createProject } = useProjects();

  const handleCreateProject = async (projectData: { name: string }) => {
    try {
      await createProject(projectData);
    } catch (error) {
      console.error('Failed to create project:', error);
    }
  };

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border h-screen flex flex-col flex-shrink-0">
      {/* Logo */}
      <div className="p-4 border-b border-sidebar-border bg-muted/30 flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Bug className="h-6 w-6 text-primary" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          </div>
          <span className="font-mono font-bold text-sidebar-foreground tracking-wider">DEV.TRACKER</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {/* Projects Section */}
        <div>
          <button
            onClick={() => setIsProjectsExpanded(!isProjectsExpanded)}
            className="flex items-center justify-between w-full p-2 text-sm font-mono font-medium text-sidebar-foreground hover:bg-sidebar-accent rounded-md transition-all duration-200"
          >
            <span className="uppercase tracking-wider">Projects</span>
            {isProjectsExpanded ? (
              <ChevronDown className="h-4 w-4 transition-transform duration-200" />
            ) : (
              <ChevronRight className="h-4 w-4 transition-transform duration-200" />
            )}
          </button>

          {isProjectsExpanded && (
            <div className="ml-4 mt-2 space-y-1">
              {projects.map((project) => (
                <NavLink
                  key={project.id}
                  to={`/project/${project.id}`}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-2 p-2 text-sm rounded-md transition-all duration-200 font-mono',
                      isActive
                        ? 'bg-primary text-primary-foreground border-l-2 border-primary-foreground'
                        : 'text-sidebar-foreground hover:bg-sidebar-accent hover:translate-x-1'
                    )
                  }
                >
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="uppercase tracking-wide">{project.name.substring(0, 8)}</span>
                </NavLink>
              ))}
            </div>
          )}
        </div>

        {/* View all projects */}
        <NavLink
          to="/projects"
          className={({ isActive }) =>
            cn(
              'flex items-center gap-2 p-2 text-sm rounded-md transition-colors font-mono',
              isActive
                ? 'bg-primary text-primary-foreground'
                : 'text-sidebar-foreground hover:bg-sidebar-accent'
            )
          }
        >
          <FolderOpen className="h-4 w-4" />
          View all projects
        </NavLink>

        {/* Create Project */}
        <ProjectDialog onSave={handleCreateProject} />
      </nav>

      {/* Bottom section */}
      <div className="p-4 border-t border-sidebar-border flex-shrink-0 space-y-2">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            cn(
              'flex items-center gap-2 p-2 text-sm rounded-md transition-colors font-mono',
              isActive
                ? 'bg-primary text-primary-foreground'
                : 'text-sidebar-foreground hover:bg-sidebar-accent'
            )
          }
        >
          <Settings className="h-4 w-4" />
          Settings
        </NavLink>
        
        {/* API Status */}
        <div className="pt-2">
          <ApiStatus />
        </div>
      </div>
    </aside>
  );
}
