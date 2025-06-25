
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, List, GitPullRequest, Folder, BookOpen } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  const sidebarItems = [
    { icon: Home, label: 'Overview', active: true, path: '/' },
    { icon: List, label: 'Issues', active: false, path: '/issues' },
    { icon: GitPullRequest, label: 'Pull Requests', active: false, path: '/pull-requests' },
    { icon: Folder, label: 'Projects', active: false, path: '/projects' },
    { icon: BookOpen, label: 'Wiki', active: false, path: '/wiki' },
  ];

  const recentActivity = [
    {
      id: 123,
      title: 'Fix login bug',
      author: 'Alex',
      date: '2023-09-20',
      status: 'Opened'
    },
    {
      id: 124,
      title: 'Update documentation',
      author: 'Sarah',
      date: '2023-09-19',
      status: 'Closed'
    },
    {
      id: 125,
      title: 'Implement new feature',
      author: 'David',
      date: '2023-09-18',
      status: 'Opened'
    }
  ];

  const teamActivity = [
    {
      author: 'Alex',
      action: 'opened issue #123',
      date: '2023-09-20'
    },
    {
      author: 'Sarah',
      action: 'closed issue #124',
      date: '2023-09-19'
    },
    {
      author: 'David',
      action: 'opened issue #125',
      date: '2023-09-18'
    }
  ];

  return (
    <Layout>
      <div className="flex min-h-screen bg-gray-50">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200">
          <div className="p-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Acme Co</h2>
            <nav className="space-y-1">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    onClick={() => navigate(item.path)}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      item.active
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-3" />
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="max-w-4xl">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Overview</h1>
              <p className="text-gray-600">Manage and track your work across all your projects</p>
            </div>

            {/* Recent Activity */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent activity</h2>
              <div className="space-y-3">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-gray-200 rounded flex-shrink-0 mt-1"></div>
                    <div>
                      <div className="font-medium text-gray-900">
                        Issue #{activity.id}: {activity.title}
                      </div>
                      <div className="text-sm text-gray-500">
                        {activity.status} by {activity.author} on {activity.date}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Issues Summary */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Issues</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-white border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => navigate('/issues')}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-gray-600">
                      Open issues
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-900">15</div>
                  </CardContent>
                </Card>

                <Card className="bg-white border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => navigate('/issues')}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-gray-600">
                      Closed issues
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-900">30</div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Team Activity */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Team activity</h2>
              <div className="space-y-3">
                {teamActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-gray-200 rounded flex-shrink-0 mt-1"></div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {activity.author} {activity.action}
                      </div>
                      <div className="text-sm text-gray-500">
                        {activity.date}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
