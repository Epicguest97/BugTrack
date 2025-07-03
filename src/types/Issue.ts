
export interface Issue {
  id: string;
  title: string;
  description: string;
  type: 'Bug' | 'Feature' | 'Task';
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  assignee: string;
  reporter: string;
  labels: string[];
  created: string;
  createdAt: string;
  updatedAt: string;
  project: string;
  resolvedTime?: number; // days to resolve
}

export interface SavedSearch {
  id: number;
  name: string;
  filters: {
    status?: string;
    priority?: string;
    assignee?: string;
    project?: string;
    search?: string;
  };
}
