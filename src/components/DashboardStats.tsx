
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Issue {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  assignee?: string;
  reporter: string;
  labels: string[];
  createdAt: string;
  updatedAt: string;
}

interface DashboardStatsProps {
  issues: Issue[];
}

export const DashboardStats = ({ issues }: DashboardStatsProps) => {
  const stats = {
    total: issues.length,
    open: issues.filter(issue => issue.status === 'open').length,
    inProgress: issues.filter(issue => issue.status === 'in-progress').length,
    resolved: issues.filter(issue => issue.status === 'resolved').length,
    critical: issues.filter(issue => issue.priority === 'critical').length
  };

  const statsCards = [
    {
      title: 'Total Issues',
      value: stats.total,
      description: 'All issues in the system',
      color: 'bg-blue-50 border-blue-200',
      textColor: 'text-blue-700'
    },
    {
      title: 'Open',
      value: stats.open,
      description: 'Issues awaiting attention',
      color: 'bg-orange-50 border-orange-200',
      textColor: 'text-orange-700'
    },
    {
      title: 'In Progress',
      value: stats.inProgress,
      description: 'Currently being worked on',
      color: 'bg-purple-50 border-purple-200',
      textColor: 'text-purple-700'
    },
    {
      title: 'Resolved',
      value: stats.resolved,
      description: 'Completed this period',
      color: 'bg-green-50 border-green-200',
      textColor: 'text-green-700'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statsCards.map((stat, index) => (
        <Card key={index} className={`${stat.color} hover:shadow-md transition-shadow`}>
          <CardHeader className="pb-2">
            <CardTitle className={`text-sm font-medium ${stat.textColor}`}>
              {stat.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${stat.textColor}`}>
              {stat.value}
            </div>
            <p className={`text-xs ${stat.textColor} opacity-80 mt-1`}>
              {stat.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
