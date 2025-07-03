
import React from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { GitPullRequest, ExternalLink, MessageSquare, Calendar, User } from 'lucide-react';

const PullRequests = () => {
  // Hardcoded pull request data
  const pullRequests = [
    {
      id: 42,
      title: 'Add user authentication system',
      author: 'sarah-dev',
      authorAvatar: 'https://github.com/sarah-dev.png',
      status: 'open',
      branch: 'feature/auth-system',
      targetBranch: 'main',
      description: 'Implements JWT-based authentication with login/logout functionality',
      createdAt: '2024-01-15',
      comments: 3,
      commits: 8,
      additions: 245,
      deletions: 12,
      githubUrl: 'https://github.com/acme-co/issue-tracker/pull/42'
    },
    {
      id: 41,
      title: 'Fix responsive design issues on mobile',
      author: 'alex-frontend',
      authorAvatar: 'https://github.com/alex-frontend.png',
      status: 'merged',
      branch: 'fix/mobile-responsive',
      targetBranch: 'main',
      description: 'Resolves layout breaking on screens smaller than 768px',
      createdAt: '2024-01-14',
      mergedAt: '2024-01-15',
      comments: 5,
      commits: 3,
      additions: 89,
      deletions: 34,
      githubUrl: 'https://github.com/acme-co/issue-tracker/pull/41'
    },
    {
      id: 40,
      title: 'Update dependencies and fix security vulnerabilities',
      author: 'david-security',
      authorAvatar: 'https://github.com/david-security.png',
      status: 'closed',
      branch: 'chore/update-deps',
      targetBranch: 'main',
      description: 'Updates all dependencies to latest versions and fixes 3 high-priority security issues',
      createdAt: '2024-01-13',
      closedAt: '2024-01-14',
      comments: 2,
      commits: 5,
      additions: 156,
      deletions: 203,
      githubUrl: 'https://github.com/acme-co/issue-tracker/pull/40'
    },
    {
      id: 39,
      title: 'Implement dark mode theme',
      author: 'emma-design',
      authorAvatar: 'https://github.com/emma-design.png',
      status: 'draft',
      branch: 'feature/dark-mode',
      targetBranch: 'main',
      description: 'Adds dark mode support with theme toggle and persisted user preference',
      createdAt: '2024-01-12',
      comments: 1,
      commits: 12,
      additions: 423,
      deletions: 67,
      githubUrl: 'https://github.com/acme-co/issue-tracker/pull/39'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'merged':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'closed':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'draft':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-2000';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open':
        return <GitPullRequest className="h-4 w-4" />;
      case 'merged':
        return <GitPullRequest className="h-4 w-4" />;
      case 'closed':
        return <GitPullRequest className="h-4 w-4" />;
      case 'draft':
        return <GitPullRequest className="h-4 w-4" />;
      default:
        return <GitPullRequest className="h-4 w-4" />;
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Pull Requests</h1>
            <p className="text-gray-600 mt-2">Review and manage code changes</p>
          </div>
          <Button asChild>
            <a href="https://github.com/acme-co/issue-tracker/pulls" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4 mr-2" />
              View on GitHub
            </a>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium">Open</span>
                <span className="text-lg font-bold ml-auto">2</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span className="text-sm font-medium">Merged</span>
                <span className="text-lg font-bold ml-auto">1</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm font-medium">Closed</span>
                <span className="text-lg font-bold ml-auto">1</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                <span className="text-sm font-medium">Draft</span>
                <span className="text-lg font-bold ml-auto">1</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pull Requests List */}
        <div className="space-y-4">
          {pullRequests.map((pr) => (
            <Card key={pr.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge className={`${getStatusColor(pr.status)} flex items-center space-x-1`}>
                        {getStatusIcon(pr.status)}
                        <span className="capitalize">{pr.status}</span>
                      </Badge>
                      <span className="text-sm text-gray-500">#{pr.id}</span>
                    </div>
                    <CardTitle className="text-lg mb-2">{pr.title}</CardTitle>
                    <p className="text-gray-600 text-sm mb-3">{pr.description}</p>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>{pr.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{pr.createdAt}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageSquare className="h-4 w-4" />
                        <span>{pr.comments} comments</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button variant="outline" size="sm" asChild>
                    <a href={pr.githubUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="font-mono text-blue-600">{pr.branch}</span>
                    <span className="text-gray-400">→</span>
                    <span className="font-mono text-gray-600">{pr.targetBranch}</span>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <span className="text-green-600">+{pr.additions}</span>
                      <span className="text-red-600">-{pr.deletions}</span>
                    </div>
                    <span>{pr.commits} commits</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default PullRequests;
