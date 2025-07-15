
import { useState, useEffect, useCallback } from 'react';
import { Issue, Project } from '@/types';
import { issueApi, projectApi } from '@/services/api';

export const useIssues = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchIssues = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching issues from API...');
      const data = await issueApi.getAll();
      console.log('Issues fetched:', data);
      setIssues(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch issues');
      console.error('Error fetching issues:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createIssue = useCallback(async (projectId: string, issueData: {
    title: string;
    description?: string;
    status?: 'TO_DO' | 'IN_PROGRESS' | 'IN_REVIEW' | 'DONE';
  }) => {
    try {
      console.log('Creating issue for project:', projectId, 'with data:', issueData);
      const newIssue = await issueApi.create(projectId, issueData);
      console.log('Issue created:', newIssue);
      setIssues(prev => [...prev, newIssue]);
      return newIssue;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create issue');
      console.error('Error creating issue:', err);
      throw err;
    }
  }, []);

  const updateIssue = useCallback(async (id: string, issueData: Partial<{
    title: string;
    description: string;
    status: 'TO_DO' | 'IN_PROGRESS' | 'IN_REVIEW' | 'DONE';
  }>) => {
    try {
      console.log('Updating issue:', id, 'with data:', issueData);
      const updatedIssue = await issueApi.update(id, issueData);
      console.log('Issue updated:', updatedIssue);
      setIssues(prev => prev.map(issue => 
        issue.id === id ? updatedIssue : issue
      ));
      return updatedIssue;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update issue');
      console.error('Error updating issue:', err);
      throw err;
    }
  }, []);

  const deleteIssue = useCallback(async (id: string) => {
    try {
      console.log('Deleting issue:', id);
      await issueApi.delete(id);
      console.log('Issue deleted:', id);
      setIssues(prev => prev.filter(issue => issue.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete issue');
      console.error('Error deleting issue:', err);
      throw err;
    }
  }, []);

  // Fetch issues on mount
  useEffect(() => {
    console.log('useIssues: Component mounted, fetching issues...');
    fetchIssues();
  }, [fetchIssues]);

  return {
    issues,
    loading,
    error,
    refetch: fetchIssues,
    createIssue,
    updateIssue,
    deleteIssue,
  };
};

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching projects from API...');
      const data = await projectApi.getAll();
      console.log('Projects fetched:', data);
      setProjects(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch projects');
      console.error('Error fetching projects:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createProject = useCallback(async (projectData: { name: string }) => {
    try {
      console.log('Creating project with data:', projectData);
      const newProject = await projectApi.create(projectData);
      console.log('Project created:', newProject);
      setProjects(prev => [...prev, newProject]);
      return newProject;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create project');
      console.error('Error creating project:', err);
      throw err;
    }
  }, []);

  const updateProject = useCallback(async (id: string, projectData: Partial<{ name: string }>) => {
    try {
      console.log('Updating project:', id, 'with data:', projectData);
      const updatedProject = await projectApi.update(id, projectData);
      console.log('Project updated:', updatedProject);
      setProjects(prev => prev.map(project => 
        project.id === id ? updatedProject : project
      ));
      return updatedProject;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update project');
      console.error('Error updating project:', err);
      throw err;
    }
  }, []);

  const deleteProject = useCallback(async (id: string) => {
    try {
      console.log('Deleting project:', id);
      await projectApi.delete(id);
      console.log('Project deleted:', id);
      setProjects(prev => prev.filter(project => project.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete project');
      console.error('Error deleting project:', err);
      throw err;
    }
  }, []);

  // Fetch projects on mount
  useEffect(() => {
    console.log('useProjects: Component mounted, fetching projects...');
    fetchProjects();
  }, [fetchProjects]);

  return {
    projects,
    loading,
    error,
    refetch: fetchProjects,
    createProject,
    updateProject,
    deleteProject,
  };
};
