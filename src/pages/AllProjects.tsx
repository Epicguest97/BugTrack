
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ProjectDialog } from '@/components/projects/ProjectDialog';
import { Plus, FolderOpen, Loader2 } from 'lucide-react';
import { useProjects } from '@/hooks/useApi';
import { useToast } from '@/hooks/use-toast';
import { useEffect } from 'react';

export default function AllProjects() {
  const { projects, loading, error, createProject, refetch } = useProjects();
  const { toast } = useToast();

  // Additional useEffect to ensure data is fresh when component mounts
  useEffect(() => {
    console.log('AllProjects: Component mounted, ensuring fresh data...');
    refetch();
  }, [refetch]);

  const handleCreateProject = async (projectData: { name: string }) => {
    try {
      console.log('AllProjects: Creating project with data:', projectData);
      await createProject(projectData);
      toast({
        title: "Success",
        description: "Project created successfully",
      });
      // Refetch to ensure we have the latest data
      await refetch();
    } catch (error) {
      console.error('AllProjects: Error creating project:', error);
      toast({
        title: "Error",
        description: "Failed to create project",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading projects...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-red-500 mb-2">Error: {error}</p>
          <Button onClick={() => refetch()}>
            Retry
          </Button>
        </div>
      </div>
    );
  }

  console.log('AllProjects: Rendering with projects:', projects);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-foreground">All Projects</h1>
        <ProjectDialog onSave={handleCreateProject} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded bg-primary text-primary-foreground flex items-center justify-center">
                <FolderOpen className="h-5 w-5" />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-medium text-foreground">{project.name}</h3>
                  <Badge variant="outline" className="text-xs">
                    {project.issues?.length || 0} issues
                  </Badge>
                </div>
                
                <p className="text-sm text-muted-foreground mb-4">
                  Project created on {new Date(project.createdAt).toLocaleDateString()}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    Created {new Date(project.createdAt).toLocaleDateString()}
                  </span>
                  
                  <Link to={`/project/${project.id}`}>
                    <Button size="sm" variant="outline">
                      View Project
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
