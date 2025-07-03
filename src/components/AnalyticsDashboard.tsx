import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Issue } from '@/types/Issue';

interface AnalyticsDashboardProps {
  issues: Issue[];
}

export const AnalyticsDashboard = ({ issues }: AnalyticsDashboardProps) => {
  // Issue count by project
  const issuesByProject = issues.reduce((acc, issue) => {
    acc[issue.project] = (acc[issue.project] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const projectData = Object.entries(issuesByProject).map(([project, count]) => ({
    project,
    total: count,
    open: issues.filter(i => i.project === project && i.status === 'open').length,
    resolved: issues.filter(i => i.project === project && i.status === 'resolved').length,
  }));

  // Priority distribution
  const priorityData = [
    { priority: 'Critical', count: issues.filter(i => i.priority === 'critical').length, color: '#ef4444' },
    { priority: 'High', count: issues.filter(i => i.priority === 'high').length, color: '#f97316' },
    { priority: 'Medium', count: issues.filter(i => i.priority === 'medium').length, color: '#eab308' },
    { priority: 'Low', count: issues.filter(i => i.priority === 'low').length, color: '#22c55e' },
  ];

  // Team performance
  const teamPerformance = issues.reduce((acc, issue) => {
    if (issue.status === 'resolved') {
      acc[issue.assignee] = (acc[issue.assignee] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const teamData = Object.entries(teamPerformance)
    .map(([assignee, resolved]) => ({ assignee, resolved }))
    .sort((a, b) => b.resolved - a.resolved);

  // Burndown chart data (mock data for demonstration)
  const burndownData = [
    { week: 'Week 1', remaining: 45, target: 40 },
    { week: 'Week 2', remaining: 38, target: 32 },
    { week: 'Week 3', remaining: 32, target: 24 },
    { week: 'Week 4', remaining: 28, target: 16 },
    { week: 'Week 5', remaining: 22, target: 8 },
    { week: 'Week 6', remaining: 15, target: 0 },
  ];

  const chartConfig = {
    total: { label: 'Total Issues', color: '#3b82f6' },
    open: { label: 'Open', color: '#22c55e' },
    resolved: { label: 'Resolved', color: '#8b5cf6' },
    remaining: { label: 'Remaining', color: '#ef4444' },
    target: { label: 'Target', color: '#6b7280' },
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Issues</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{issues.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Open Issues</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {issues.filter(i => i.status === 'open').length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Resolved This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {issues.filter(i => i.status === 'resolved').length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Avg Resolution Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5.2 days</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Issues by Project */}
        <Card>
          <CardHeader>
            <CardTitle>Issues by Project</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <BarChart data={projectData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="project" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="total" fill="var(--color-total)" />
                <Bar dataKey="open" fill="var(--color-open)" />
                <Bar dataKey="resolved" fill="var(--color-resolved)" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Burndown Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Issue Burndown Chart</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <LineChart data={burndownData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="remaining" stroke="var(--color-remaining)" strokeWidth={2} />
                <Line type="monotone" dataKey="target" stroke="var(--color-target)" strokeWidth={2} strokeDasharray="5 5" />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Priority Heatmap */}
        <Card>
          <CardHeader>
            <CardTitle>Priority Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <PieChart>
                <Pie
                  data={priorityData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="count"
                  label={({ priority, count }) => `${priority}: ${count}`}
                >
                  {priorityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Team Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Team Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teamData.slice(0, 5).map((member, index) => (
                <div key={member.assignee} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <span className="font-medium">{member.assignee}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${(member.resolved / Math.max(...teamData.map(t => t.resolved))) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium">{member.resolved}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
