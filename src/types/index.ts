export interface Project {
  id: string;
  name: string;
  description?: string;
  key?: string;
  createdAt: string;
  issues?: Issue[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export type IssueStatus = 'TO_DO' | 'IN_PROGRESS' | 'IN_REVIEW' | 'DONE';
export type IssuePriority = 'low' | 'medium' | 'high' | 'critical';

export interface Issue {
  id: string;
  projectId: string;
  title: string;
  description?: string;
  status: IssueStatus;
  priority?: IssuePriority;
  assigneeId?: string;
  createdAt: string;
  updatedAt: string;
  dueDate?: Date;
  project?: Project;
}

export interface Activity {
  id: string;
  userId: string;
  issueId: string;
  action: string;
  field?: string;
  oldValue?: string;
  newValue?: string;
  timestamp: Date;
}

export interface ProjectStats {
  completed: number;
  updated: number;
  created: number;
  dueSoon: number;
}

export interface StatusDistribution {
  TO_DO: number;
  IN_PROGRESS: number;
  IN_REVIEW: number;
  DONE: number;
}