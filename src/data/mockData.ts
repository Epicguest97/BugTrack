import { Project, User, Issue, Activity } from '@/types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Mehul',
    email: 'mehul@company.com',
    avatar: 'M'
  },
  {
    id: '2',
    name: 'Sarah Chen',
    email: 'sarah@company.com',
    avatar: 'S'
  },
  {
    id: '3',
    name: 'Alex Rodriguez',
    email: 'alex@company.com',
    avatar: 'A'
  }
];

export const mockProjects: Project[] = [
  {
    id: '1',
    name: 'My Scrum Project',
    description: 'Main development project for our application',
    createdAt: '2024-01-01T00:00:00.000Z',
    key: 'SCRUM'
  },
  {
    id: '2',
    name: 'Website Redesign',
    description: 'Complete redesign of the company website',
    createdAt: '2024-02-01T00:00:00.000Z',
    key: 'WEB'
  },
  {
    id: '3',
    name: 'Mobile App',
    description: 'Development of mobile application',
    createdAt: '2024-03-01T00:00:00.000Z',
    key: 'MOBILE'
  }
];

export const mockIssues: Issue[] = [
  {
    id: '1',
    projectId: '1',
    title: 'Password Recovery Feature',
    description: 'Implement password recovery functionality for users',
    status: 'IN_REVIEW',
    priority: 'medium',
    assigneeId: '1',
    createdAt: '2024-07-01T00:00:00.000Z',
    updatedAt: '2024-07-11T00:00:00.000Z',
    dueDate: new Date('2024-07-15')
  },
  {
    id: '2',
    projectId: '1',
    title: 'Set up Razorpay Integration',
    description: 'Configure Razorpay payment gateway for subscription handling',
    status: 'TO_DO',
    priority: 'high',
    assigneeId: '1',
    createdAt: '2024-07-05T00:00:00.000Z',
    updatedAt: '2024-07-11T00:00:00.000Z'
  },
  {
    id: '3',
    projectId: '1',
    title: 'Fix Navigation Bug',
    description: 'Navigation menu not working properly on mobile devices',
    status: 'DONE',
    priority: 'medium',
    assigneeId: '2',
    createdAt: '2024-07-08T00:00:00.000Z',
    updatedAt: '2024-07-10T00:00:00.000Z'
  },
  {
    id: '4',
    projectId: '1',
    title: 'Database Optimization',
    description: 'Optimize database queries for better performance',
    status: 'IN_PROGRESS',
    priority: 'low',
    assigneeId: '3',
    createdAt: '2024-07-09T00:00:00.000Z',
    updatedAt: '2024-07-11T00:00:00.000Z'
  },
  {
    id: '5',
    projectId: '1',
    title: 'User Authentication',
    description: 'Implement secure user authentication system',
    status: 'DONE',
    priority: 'critical',
    assigneeId: '1',
    createdAt: '2024-06-15T00:00:00.000Z',
    updatedAt: '2024-07-05T00:00:00.000Z'
  }
];

export const mockActivities: Activity[] = [
  {
    id: '1',
    userId: '1',
    issueId: '1',
    action: 'updated field',
    field: 'Rank',
    timestamp: new Date(Date.now() - 28 * 60 * 1000)
  },
  {
    id: '2',
    userId: '1',
    issueId: '1',
    action: 'updated field',
    field: 'status',
    oldValue: 'In Progress',
    newValue: 'In Review',
    timestamp: new Date(Date.now() - 28 * 60 * 1000)
  },
  {
    id: '3',
    userId: '1',
    issueId: '2',
    action: 'updated field',
    field: 'Sprint',
    timestamp: new Date(Date.now() - 28 * 60 * 1000)
  }
];