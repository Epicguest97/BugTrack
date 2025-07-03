
import React from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Folder, GitBranch, Users, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Projects = () => {
  const navigate = useNavigate();

  const projects = [
    {
      id: 1,
      name: 'Issue Tracker',
      description: 'Main issue tracking application',
      status: 'Active',
      lastUpdated: '2023-09-20',
      contributors: 8,
      branches: 5,
    },
    {
      id: 2,
      name: 'Documentation Site',
      description: 'Project documentation and guides',
      status: 'Active',
      lastUpdated: '2023-09-19',
      contributors: 3,
      branches: 2,
    },
    {
      id: 3,
      name: 'API Gateway',
      description: 'Backend API services',
      status: 'Maintenance',
      lastUpdated: '2023-09-18',
      contributors: 5,
      branches: 3,
    },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
            <p className="text-gray-600 mt-2">Manage and overview all your projects</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            New Project
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card 
              key={project.id} 
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => navigate(`/projects/${project.id}`)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Folder className="h-5 w-5 text-blue-600" />
                  <CardTitle className="text-lg">{project.name}</CardTitle>
                </div>
                <p className="text-sm text-gray-600 mt-2">{project.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Status</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      project.status === 'Active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{project.contributors}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <GitBranch className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{project.branches}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Calendar className="h-4 w-4" />
                    <span>Updated {project.lastUpdated}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Projects;
