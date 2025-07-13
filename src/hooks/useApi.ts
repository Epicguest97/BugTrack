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
      const data = await issueApi.getAll();
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
      const newIssue = await issueApi.create(projectId, issueData);
      setIssues(prev => [...prev, newIssue]);
      return newIssue;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create issue');
      throw err;
    }
  }, []);

  const updateIssue = useCallback(async (id: string, issueData: Partial<{
    title: string;
    description: string;
    status: 'TO_DO' | 'IN_PROGRESS' | 'IN_REVIEW' | 'DONE';
  }>) => {
    try {
      const updatedIssue = await issueApi.update(id, issueData);
      setIssues(prev => prev.map(issue => 
        issue.id === id ? updatedIssue : issue
      ));
      return updatedIssue;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update issue');
      throw err;
    }
  }, []);

  const deleteIssue = useCallback(async (id: string) => {
    try {
      await issueApi.delete(id);
      setIssues(prev => prev.filter(issue => issue.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete issue');
      throw err;
    }
  }, []);

  useEffect(() => {
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
      const data = await projectApi.getAll();
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
      const newProject = await projectApi.create(projectData);
      setProjects(prev => [...prev, newProject]);
      return newProject;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create project');
      throw err;
    }
  }, []);

  const updateProject = useCallback(async (id: string, projectData: Partial<{ name: string }>) => {
    try {
      const updatedProject = await projectApi.update(id, projectData);
      setProjects(prev => prev.map(project => 
        project.id === id ? updatedProject : project
      ));
      return updatedProject;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update project');
      throw err;
    }
  }, []);

  const deleteProject = useCallback(async (id: string) => {
    try {
      await projectApi.delete(id);
      setProjects(prev => prev.filter(project => project.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete project');
      throw err;
    }
  }, []);

  useEffect(() => {
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
