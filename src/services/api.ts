// Use deployed backend
const API_BASE_URL = 'http://localhost:3000/api'; // Make sure this matches your backend port

// Helper function to handle API responses
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'An error occurred' }));
    throw new Error(error.error || `HTTP error! status: ${response.status}`);
  }
  
  // Handle 204 No Content responses
  if (response.status === 204) {
    return null;
  }
  
  return response.json();
};

// Helper function to make API requests
const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(url, config);
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Network error' }));
    throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
  }
  
  // Handle 204 No Content responses (like delete operations)
  if (response.status === 204) {
    return null;
  }
  
  return response.json();
};

// Issue API methods
export const issueApi = {
  // Get all issues
  getAll: () => apiRequest('/issues'),
  
  // Get issue by ID
  getById: (id: string) => apiRequest(`/issues/${id}`),
  
  // Create new issue - FIX: Change from `/issues/${projectId}` to `/issues/${projectId}`
  create: (projectId: string, issueData: {
    title: string;
    description?: string;
    status?: 'TO_DO' | 'IN_PROGRESS' | 'IN_REVIEW' | 'DONE';
  }) => apiRequest(`/issues/${projectId}`, {
    method: 'POST',
    body: JSON.stringify(issueData),
  }),
  
  // Update issue
  update: (id: string, issueData: Partial<{
    title: string;
    description: string;
    status: 'TO_DO' | 'IN_PROGRESS' | 'IN_PROGRESS' | 'DONE';
  }>) => apiRequest(`/issues/${id}`, {
    method: 'PUT',
    body: JSON.stringify(issueData),
  }),
  
  // Delete issue
  delete: (id: string) => apiRequest(`/issues/${id}`, {
    method: 'DELETE',
  }),
};

// Project API methods
export const projectApi = {
  // Get all projects
  getAll: () => apiRequest('/projects'),
  
  // Get project by ID
  getById: (id: string) => apiRequest(`/projects/${id}`),
  
  // Create new project
  create: (projectData: {
    name: string;
  }) => apiRequest('/projects', {
    method: 'POST',
    body: JSON.stringify(projectData),
  }),
  
  // Update project
  update: (id: string, projectData: Partial<{
    name: string;
  }>) => apiRequest(`/projects/${id}`, {
    method: 'PUT',
    body: JSON.stringify(projectData),
  }),
  
  // Delete project
  delete: (id: string) => apiRequest(`/projects/${id}`, {
    method: 'DELETE',
  }),
  
  // Get project statistics
  getStatistics: (id: string) => apiRequest(`/projects/${id}/statistics`),
};

// Health check
export const healthCheck = () => apiRequest('/health');

export default {
  issues: issueApi,
  projects: projectApi,
  health: healthCheck,
};
