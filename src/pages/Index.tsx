import { Link } from 'react-router-dom';
import { mockProjects } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Bug, FolderOpen, Plus, ArrowRight } from 'lucide-react';

const Index = () => {
  const recentProjects = mockProjects.slice(0, 3);

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Bug className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">IssueTracker</h1>
          </div>
          <p className="text-xl text-muted-foreground mb-8">
            Minimalistic bug tracking for small teams
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link to="/projects">
              <Button size="lg">
                <FolderOpen className="h-5 w-5 mr-2" />
                View All Projects
              </Button>
            </Link>
            <Button size="lg" variant="outline">
              <Plus className="h-5 w-5 mr-2" />
              Create Project
            </Button>
          </div>
        </div>

        {/* Recent Projects */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-foreground">Recent Projects</h2>
            <Link to="/projects" className="flex items-center gap-1 text-primary hover:underline">
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentProjects.map((project) => (
              <Card key={project.id} className="p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded bg-primary text-primary-foreground flex items-center justify-center">
                    <FolderOpen className="h-5 w-5" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground mb-2">{project.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    
                    <Link to={`/project/${project.id}`}>
                      <Button size="sm" variant="outline" className="w-full">
                        Open Project
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
