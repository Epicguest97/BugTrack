
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Bell, BellOff, Settings, GitBranch, Clock, AlertCircle, CheckCircle, XCircle, Play } from 'lucide-react';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isWatching, setIsWatching] = useState(false);

  // Mock project data
  const project = {
    id: parseInt(id || '1'),
    name: 'Issue Tracker',
    description: 'Main issue tracking application',
    status: 'Active',
    lastUpdated: '2023-09-20',
    contributors: 8,
    branches: 5,
  };

  const workflowStates = [
    { id: 1, name: 'Open', color: 'bg-blue-100 text-blue-800', icon: AlertCircle },
    { id: 2, name: 'In Progress', color: 'bg-yellow-100 text-yellow-800', icon: Play },
    { id: 3, name: 'Under Review', color: 'bg-purple-100 text-purple-800', icon: Clock },
    { id: 4, name: 'Testing', color: 'bg-orange-100 text-orange-800', icon: Settings },
    { id: 5, name: 'Closed', color: 'bg-green-100 text-green-800', icon: CheckCircle },
    { id: 6, name: 'Rejected', color: 'bg-red-100 text-red-800', icon: XCircle },
  ];

  const issues = [
    {
      id: 123,
      title: 'Fix login authentication bug',
      status: 'In Progress',
      priority: 'High',
      assignee: 'Alex Johnson',
      versionAffected: '2.1.0',
      versionFixed: null,
      subTasks: [
        'Identify root cause in authentication flow',
        'Update JWT token validation',
        'Add comprehensive test cases'
      ]
    },
    {
      id: 124,
      title: 'Update user interface components',
      status: 'Under Review',
      priority: 'Medium', 
      assignee: 'Sarah Davis',
      versionAffected: '2.0.5',
      versionFixed: '2.2.0',
      subTasks: [
        'Redesign button components',
        'Update color scheme',
        'Test accessibility compliance'
      ]
    }
  ];

  const notifications = [
    {
      type: 'Email',
      enabled: true,
      description: 'Get notified via email for important updates'
    },
    {
      type: 'In-App',
      enabled: true,
      description: 'Receive notifications within the application'
    },
    {
      type: 'Slack',
      enabled: false,
      description: 'Send notifications to your Slack workspace'
    },
    {
      type: 'Webhook',
      enabled: false,
      description: 'Custom webhook notifications for integrations'
    }
  ];

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/projects')}
              className="p-2"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{project.name}</h1>
              <p className="text-gray-600 mt-1">{project.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={isWatching ? "default" : "outline"}
              onClick={() => setIsWatching(!isWatching)}
              className="flex items-center gap-2"
            >
              {isWatching ? <Bell className="h-4 w-4" /> : <BellOff className="h-4 w-4" />}
              {isWatching ? 'Watching' : 'Watch'}
            </Button>
            <Button variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        <Tabs defaultValue="workflow" className="space-y-6">
          <TabsList>
            <TabsTrigger value="workflow">Bug Lifecycle & Workflow</TabsTrigger>
            <TabsTrigger value="issues">Issues</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          <TabsContent value="workflow" className="space-y-6">
            {/* Workflow States */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GitBranch className="h-5 w-5" />
                  Custom Workflow (Kanban-style)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {workflowStates.map((state) => {
                    const Icon = state.icon;
                    return (
                      <div key={state.id} className="text-center">
                        <div className={`p-4 rounded-lg border-2 border-dashed border-gray-200 hover:border-gray-300 transition-colors`}>
                          <Icon className="h-6 w-6 mx-auto mb-2 text-gray-500" />
                          <Badge className={state.color}>{state.name}</Badge>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Automatic State Transitions</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Auto-close issues after 30 days of inactivity</li>
                    <li>• Move to "Testing" when pull request is created</li>
                    <li>• Auto-assign reviewer when status changes to "Under Review"</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="issues" className="space-y-6">
            {/* Issues with Sub-tasks and Versions */}
            <div className="space-y-4">
              {issues.map((issue) => (
                <Card key={issue.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">#{issue.id} {issue.title}</CardTitle>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge className={
                            issue.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                            issue.status === 'Under Review' ? 'bg-purple-100 text-purple-800' :
                            'bg-blue-100 text-blue-800'
                          }>
                            {issue.status}
                          </Badge>
                          <Badge variant={issue.priority === 'High' ? 'destructive' : 'secondary'}>
                            {issue.priority}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right text-sm text-gray-600">
                        <div>Assigned to: {issue.assignee}</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Version Information */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700">Version Affected</label>
                        <div className="mt-1 text-sm text-gray-900">{issue.versionAffected}</div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Version Fixed</label>
                        <div className="mt-1 text-sm text-gray-900">
                          {issue.versionFixed || 'Not fixed yet'}
                        </div>
                      </div>
                    </div>

                    {/* Sub-tasks/Steps to Reproduce */}
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Sub-tasks / Steps to Reproduce</label>
                      <ul className="space-y-2">
                        {issue.subTasks.map((task, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm">
                            <input type="checkbox" className="rounded" />
                            <span>{task}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            {/* Notification Preferences */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notifications.map((notification, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{notification.type} Notifications</h4>
                        <p className="text-sm text-gray-600 mt-1">{notification.description}</p>
                      </div>
                      <Button
                        variant={notification.enabled ? "default" : "outline"}
                        size="sm"
                      >
                        {notification.enabled ? 'Enabled' : 'Disabled'}
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Watch/Unwatch Options</h4>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div className="flex items-center justify-between">
                      <span>Watch this project</span>
                      <Button variant="outline" size="sm">
                        {isWatching ? 'Unwatch' : 'Watch'}
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Watch specific issues</span>
                      <Button variant="outline" size="sm">Configure</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default ProjectDetail;
