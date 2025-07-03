
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, Link, Bell, Database, Server, Zap } from 'lucide-react';

const Integrations = () => {
  const [connectedIntegrations, setConnectedIntegrations] = useState(['github']);

  const integrations = [
    {
      id: 'github',
      name: 'GitHub',
      description: 'Connect your GitHub repositories for seamless code integration',
      category: 'development',
      icon: '🐙',
      status: connectedIntegrations.includes('github') ? 'connected' : 'available',
      features: ['Repository sync', 'Pull request tracking', 'Issue sync', 'Code reviews']
    },
    {
      id: 'slack',
      name: 'Slack',
      description: 'Get notifications and updates in your Slack channels',
      category: 'communication',
      icon: '💬',
      status: connectedIntegrations.includes('slack') ? 'connected' : 'available',
      features: ['Issue notifications', 'PR updates', 'Team mentions', 'Custom alerts']
    },
    {
      id: 'teams',
      name: 'Microsoft Teams',
      description: 'Collaborate with your team through Microsoft Teams',
      category: 'communication',
      icon: '👥',
      status: connectedIntegrations.includes('teams') ? 'connected' : 'available',
      features: ['Team notifications', 'Meeting integrations', 'Chat updates', 'File sharing']
    },
    {
      id: 'aws',
      name: 'AWS',
      description: 'Monitor your AWS deployments and view logs',
      category: 'deployment',
      icon: '☁️',
      status: connectedIntegrations.includes('aws') ? 'connected' : 'available',
      features: ['CloudWatch logs', 'Deployment status', 'Error monitoring', 'Performance metrics']
    },
    {
      id: 'render',
      name: 'Render',
      description: 'Track your Render deployments and monitor applications',
      category: 'deployment',
      icon: '🚀',
      status: connectedIntegrations.includes('render') ? 'connected' : 'available',
      features: ['Deploy logs', 'Build status', 'Environment monitoring', 'Auto-deploy tracking']
    },
    {
      id: 'railway',
      name: 'Railway',
      description: 'Monitor Railway deployments and application health',
      category: 'deployment',
      icon: '🚂',
      status: connectedIntegrations.includes('railway') ? 'connected' : 'available',
      features: ['Deployment logs', 'Service monitoring', 'Database insights', 'Usage analytics']
    },
    {
      id: 'jira',
      name: 'Jira',
      description: 'Sync issues and project management with Jira',
      category: 'project-management',
      icon: '📋',
      status: connectedIntegrations.includes('jira') ? 'connected' : 'available',
      features: ['Issue sync', 'Sprint tracking', 'Board integration', 'Time tracking']
    }
  ];

  const recentActivity = [
    {
      integration: 'GitHub',
      message: 'New pull request #42 opened in main repository',
      timestamp: '2 minutes ago',
      type: 'pr'
    },
    {
      integration: 'AWS',
      message: 'Deployment successful on production environment',
      timestamp: '15 minutes ago',
      type: 'deploy'
    },
    {
      integration: 'Slack',
      message: 'Issue #123 mentioned in #dev-team channel',
      timestamp: '1 hour ago',
      type: 'notification'
    },
    {
      integration: 'Render',
      message: 'Build failed for feature-branch deployment',
      timestamp: '2 hours ago',
      type: 'error'
    }
  ];

  const handleConnect = (integrationId: string) => {
    setConnectedIntegrations(prev => [...prev, integrationId]);
  };

  const handleDisconnect = (integrationId: string) => {
    setConnectedIntegrations(prev => prev.filter(id => id !== integrationId));
  };

  const getIntegrationsByCategory = (category: string) => {
    return integrations.filter(integration => integration.category === category);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Integrations</h1>
          <p className="text-gray-600 mt-2">Connect your favorite tools and services</p>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="development">Development</TabsTrigger>
            <TabsTrigger value="communication">Communication</TabsTrigger>
            <TabsTrigger value="deployment">Deployment</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {integrations.map((integration) => (
                <Card key={integration.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{integration.icon}</span>
                        <CardTitle className="text-lg">{integration.name}</CardTitle>
                      </div>
                      <Badge variant={integration.status === 'connected' ? 'default' : 'secondary'}>
                        {integration.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{integration.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Features</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {integration.features.map((feature, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="pt-2">
                        {integration.status === 'connected' ? (
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="flex-1">
                              <Settings className="h-4 w-4 mr-2" />
                              Configure
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleDisconnect(integration.id)}
                            >
                              Disconnect
                            </Button>
                          </div>
                        ) : (
                          <Button 
                            className="w-full" 
                            size="sm"
                            onClick={() => handleConnect(integration.id)}
                          >
                            <Link className="h-4 w-4 mr-2" />
                            Connect
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="development" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getIntegrationsByCategory('development').map((integration) => (
                <Card key={integration.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{integration.icon}</span>
                        <CardTitle className="text-lg">{integration.name}</CardTitle>
                      </div>
                      <Badge variant={integration.status === 'connected' ? 'default' : 'secondary'}>
                        {integration.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">{integration.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="communication">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getIntegrationsByCategory('communication').map((integration) => (
                <Card key={integration.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{integration.icon}</span>
                        <CardTitle className="text-lg">{integration.name}</CardTitle>
                      </div>
                      <Badge variant={integration.status === 'connected' ? 'default' : 'secondary'}>
                        {integration.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">{integration.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="deployment">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getIntegrationsByCategory('deployment').map((integration) => (
                <Card key={integration.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{integration.icon}</span>
                        <CardTitle className="text-lg">{integration.name}</CardTitle>
                      </div>
                      <Badge variant={integration.status === 'connected' ? 'default' : 'secondary'}>
                        {integration.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">{integration.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        activity.type === 'error' ? 'bg-red-500' :
                        activity.type === 'deploy' ? 'bg-green-500' :
                        activity.type === 'pr' ? 'bg-blue-500' : 'bg-yellow-500'
                      }`} />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm">{activity.integration}</span>
                          <span className="text-xs text-gray-500">{activity.timestamp}</span>
                        </div>
                        <p className="text-sm text-gray-700">{activity.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Integrations;
